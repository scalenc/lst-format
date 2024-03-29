import { Attachment } from '../model/Attachment';
import { ColumnDescription, ValueType } from '../model/ColumnDescription';
import { ColumnDescriptions } from '../model/ColumnDescriptions';
import { DataSet } from '../model/DataSet';
import { Document, MeasuringSystem } from '../model/Document';
import { Table } from '../model/Table';
import { Constants } from './Constants';

export class Writer {
  NEWLINE = '\r\n';
  MAX_LINE_LENGTH = 71;

  public writeDocuments(documents: Document[]): string {
    return documents.map((x) => this.writeDocument(x)).join('C' + this.NEWLINE);
  }

  public writeDocument(document: Document): string {
    const content =
      this.writePreamble(document) +
      Constants.BEGIN_DOCUMENT +
      this.NEWLINE +
      this.writeHeader(document) +
      Constants.COMMENT +
      this.NEWLINE +
      this.writeTables(document.tables) +
      this.writeAttachments(document.attachments) +
      Constants.END_DOCUMENT +
      this.NEWLINE;
    return content;
  }

  private writeHeader(document: Document): string {
    switch (document.measuringSystem) {
      case MeasuringSystem.METRIC:
        return Constants.Header.METRIC_MEASURE + this.NEWLINE;
      case MeasuringSystem.IMPERIAL:
        return Constants.Header.IMPERIAL_MEASURE + this.NEWLINE;
      default:
        throw new Error(`Unknown measuring system ${document.measuringSystem}.`);
    }
  }

  private writeTables(tables: Table[]): string {
    return tables.map((x) => this.writeTable(x)).join('');
  }

  private writeTable(table: Table): string {
    const content =
      Constants.Table.BEGIN_PREFIX +
      table.name +
      this.NEWLINE +
      Constants.COMMENT +
      this.NEWLINE +
      this.writeColumnDescriptions(table.columnDescriptions) +
      Constants.COMMENT +
      this.NEWLINE +
      this.writeDataSets(table.columnDescriptions, table.dataSets) +
      Constants.COMMENT +
      this.NEWLINE +
      Constants.Table.END_PREFIX +
      table.name +
      this.NEWLINE +
      Constants.COMMENT +
      this.NEWLINE;
    return content;
  }

  private writeColumnDescriptions(columDescriptions: ColumnDescriptions): string {
    const content =
      Constants.Table.Count.ID +
      Constants.Table.FIELD_SEPARATOR +
      Constants.Table.ColumnDescription.ID +
      Constants.Table.FIELD_SEPARATOR +
      columDescriptions.length +
      this.NEWLINE +
      columDescriptions.columns.map((x) => this.writeColumnDescription(x)).join('');
    return content;
  }

  private writeColumnDescription(columnDescription: ColumnDescription): string {
    const content =
      Constants.Table.ColumnDescription.ID +
      Constants.Table.FIELD_SEPARATOR +
      'AT' +
      Constants.Table.FIELD_SEPARATOR +
      '1' +
      Constants.Table.FIELD_SEPARATOR +
      columnDescription.id.toString().padStart(4) +
      Constants.Table.FIELD_SEPARATOR +
      '1' +
      Constants.Table.FIELD_SEPARATOR +
      '1' +
      Constants.Table.FIELD_SEPARATOR +
      Constants.Table.FIELD_SEPARATOR +
      (Constants.Table.STRING_SEPARATOR + columnDescription.name + Constants.Table.STRING_SEPARATOR).padEnd(40) +
      Constants.Table.FIELD_SEPARATOR +
      Constants.Table.FIELD_SEPARATOR +
      `'${columnDescription.unit ?? ''}'` +
      Constants.Table.FIELD_SEPARATOR +
      this.writeValueType(columnDescription.valueType) +
      this.NEWLINE;
    return content;
  }

  private writeValueType(valueType: ValueType): string {
    switch (valueType) {
      case ValueType.NUMBER:
        return Constants.Table.ColumnDescription.NUMBER_VALUE_TYPE;
      case ValueType.TEXT:
        return Constants.Table.ColumnDescription.TEXT_VALUE_TYPE;
      case ValueType.ENUM:
        return Constants.Table.ColumnDescription.ENUM_VALUE_TYPE;
      case ValueType.BOOLEAN:
        return Constants.Table.ColumnDescription.BOOLEAN_VALUE_TYPE;
      default:
        throw new Error(`Invalid value type ${valueType}.`);
    }
  }

  private writeDataSets(columnDescriptions: ColumnDescriptions, dataSets: DataSet[]): string {
    const content =
      Constants.Table.Count.ID +
      Constants.Table.FIELD_SEPARATOR +
      Constants.Table.Data.ID +
      Constants.Table.FIELD_SEPARATOR +
      dataSets.length +
      this.NEWLINE +
      dataSets.map((x) => this.writeDataSet(columnDescriptions, x)).join('');
    return content;
  }

  private writeDataSet(columnDescriptions: ColumnDescriptions, dataSet: DataSet): string {
    if (columnDescriptions.length !== dataSet.values.length) {
      throw new Error(`Column description and data set have different counts.`);
    }

    let content = Constants.Table.Data.ID + Constants.Table.FIELD_SEPARATOR;

    let lineLength = Constants.Table.Data.ID.length + 1; // + 1 separator char.

    for (let i = 0; i < dataSet.values.length; ++i) {
      // eslint-disable-next-line security/detect-object-injection
      let output = this.writeValue(columnDescriptions.columns[i].valueType, dataSet.values[i]);
      if (i + 1 < dataSet.values.length) {
        output += Constants.Table.FIELD_SEPARATOR;
      }

      if (lineLength + output.length >= this.MAX_LINE_LENGTH) {
        content += this.NEWLINE + Constants.Table.LINE_CONNECTOR + '  ';
        lineLength = 3; // = line connector + two spaces.
      }

      content += output;
      lineLength += output.length;
    }
    content += this.NEWLINE;

    if (dataSet.attachment?.length) {
      content += Constants.Table.Data.BEGIN_ATTACHMENT + this.NEWLINE + dataSet.attachment.join(this.NEWLINE);
      if (!content.endsWith('\n')) {
        content += this.NEWLINE;
      }
      content += Constants.Table.Data.END_ATTACHMENT + this.NEWLINE;
    }

    return content;
  }

  private writeValue(valueType: ValueType, value: string): string {
    if (value === Constants.Table.EMPTY_FIELD_TOKEN) return '';
    switch (valueType) {
      case ValueType.NUMBER:
      case ValueType.ENUM:
      case ValueType.BOOLEAN:
        return value;
      case ValueType.TEXT:
        return Constants.Table.STRING_SEPARATOR + value + Constants.Table.STRING_SEPARATOR;
      default:
        throw new Error(`Invalid value type ${valueType}.`);
    }
  }

  private writeAttachments(attachments: Attachment[]): string {
    return attachments.map((x) => this.writeAttachment(x)).join('');
  }

  private writeAttachment(attachment: Attachment): string {
    const content =
      Constants.Table.ATTACHMENT_START_PREFIX +
      attachment.name +
      this.NEWLINE +
      attachment.data.join(this.NEWLINE) +
      (attachment.data.length ? this.NEWLINE : '') +
      Constants.Table.ATTACHMENT_STOP_PREFIX +
      attachment.name +
      this.NEWLINE +
      Constants.COMMENT +
      this.NEWLINE;
    return content;
  }

  private writePreamble(document: Document): string {
    return document.preamble ? document.preamble + this.NEWLINE : '';
  }
}
