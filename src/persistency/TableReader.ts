/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ValueType } from '../model/ColumnDescription';
import { Table } from '../model/Table';
import { Constants } from './Constants';
import { Parser } from './Parser';
import { TableLineReader } from './TableLineReader';

export class TableReader {
  tableLineReader: TableLineReader;
  table?: Table;

  public constructor(private parser: Parser) {
    this.tableLineReader = new TableLineReader(parser);
  }

  public read(): void {
    this.table = new Table();
    this.readBegin();
    this.readColumnDescriptions();
    this.readData();
    this.readEnd();
  }

  private readBegin(): void {
    if (this.parser.token == null || !this.parser.token.startsWith(Constants.Table.BEGIN_PREFIX)) {
      throw `Expected table definition in LST line ${this.parser.lineNumber}.`;
    }

    this.table!.name = this.parser.token.substring(Constants.Table.BEGIN_PREFIX.length);

    this.tableLineReader.read();
  }

  private readColumnDescriptions(): void {
    this.readCountDataSet(Constants.Table.ColumnDescription.ID);

    while (this.parser.isOk) {
      this.tableLineReader.read();
      if (!this.isColumDescriptionLine()) {
        break;
      }
      this.addColumnSpecification();
    }
  }

  private addColumnSpecification(): void {
    if (this.tableLineReader.fields.length != Constants.Table.ColumnDescription.FIELD_COUNT || !this.isColumDescriptionLine()) {
      throw `Invalid column definition in table ${this.table!.name} in LST line ${this.parser.lineNumber}.`;
    }

    const id = +this.tableLineReader.fields[Constants.Table.ColumnDescription.COLUMN_ID_INDEX];
    const name = this.tableLineReader.fields[Constants.Table.ColumnDescription.NAME_INDEX];
    const unit = this.tableLineReader.fields[Constants.Table.ColumnDescription.UNIT_INDEX];
    const valueType = this.toValueType(this.tableLineReader.fields[Constants.Table.ColumnDescription.VALUE_TYPE_INDEX]);

    this.table!.addColumn(id, name, unit, valueType);
  }

  private toValueType(valueTypeString: string): ValueType {
    if (valueTypeString == Constants.Table.ColumnDescription.TEXT_VALUE_TYPE) {
      return ValueType.TEXT;
    } else if (valueTypeString == Constants.Table.ColumnDescription.NUMBER_VALUE_TYPE) {
      return ValueType.NUMBER;
    } else {
      throw `Unknown value type ${valueTypeString} in LST line ${this.parser.lineNumber}.`;
    }
  }

  private readData(): void {
    this.readCountDataSet(Constants.Table.Data.ID);

    while (this.parser.isOk) {
      this.tableLineReader.read();
      if (this.isDataSetLine()) {
        this.addDataSet();
      } else if (this.isAttachmentStartLine()) {
        const attachment = this.readAttachment();
        this.addAttachment(attachment);
      } else {
        break;
      }
    }
  }

  private addDataSet(): void {
    if (
      this.tableLineReader.fields.length != this.table!.columnDescriptions.length + 1 || // +1 due to 'DA'.
      !this.isDataSetLine()
    ) {
      throw `Invalid data set in table ${this.table!.name} in LST line ${this.parser.lineNumber}.`;
    }

    const dataSet = this.table!.addDataSet();
    dataSet.values = this.tableLineReader.fields.slice(1); // Remove 'DA' field.

    if (this.parser.isOk && this.parser.token == Constants.Table.Data.BEGIN_ATTACHMENT) {
      dataSet.attachment = this.readAttachment();
    }
  }

  private readAttachment(): string[] {
    const content = [];
    while (this.parser.tryReadLine() && this.parser.token != Constants.Table.Data.END_ATTACHMENT) {
      content.push(this.parser.token);
    }
    return content;
  }

  private addAttachment(attachment: string[]): void {
    if (this.table!.dataSets.length == 0) {
      throw `Text attachment without data set LST line ${this.parser.lineNumber}.`;
    }

    this.table!.dataSets[this.table!.dataSets.length - 1].attachment = attachment;
  }

  private readEnd(): void {
    if (this.tableLineReader.fields.length != 1 || this.tableLineReader.fields[0] != Constants.Table.END_PREFIX + this.table!.name) {
      throw `Missing end of table ${this.table!.name} in LST line ${this.parser.lineNumber}.`;
    }

    this.parser.tryReadContentLine();
  }

  private readCountDataSet(id: string): number {
    if (
      this.tableLineReader.fields.length != Constants.Table.Count.FIELDS_COUNT ||
      this.tableLineReader.fields[Constants.Table.Count.ID_INDEX] != Constants.Table.Count.ID ||
      this.tableLineReader.fields[Constants.Table.Count.TARGET_ID_INDEX] != id
    ) {
      throw `Missing count of data sets in table definition in LST line ${this.parser.lineNumber}.`;
    }

    const count = +this.tableLineReader.fields[Constants.Table.Count.COUNT_INDEX];
    return count;
  }

  private isColumDescriptionLine(): boolean {
    const fields = this.tableLineReader.fields;
    return fields.length > 1 && fields[Constants.Table.ColumnDescription.ID_INDEX].toUpperCase() == Constants.Table.ColumnDescription.ID;
  }

  private isDataSetLine(): boolean {
    const fields = this.tableLineReader.fields;
    return fields.length > 1 && fields[Constants.Table.Data.ID_INDEX].toUpperCase() == Constants.Table.Data.ID;
  }

  private isAttachmentStartLine(): boolean {
    return this.tableLineReader.fields.length == 1 && this.tableLineReader.fields[0] == Constants.Table.Data.BEGIN_ATTACHMENT;
  }
}
