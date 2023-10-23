/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Attachment } from '../model/Attachment';
import { Document, MeasuringSystem } from '../model/Document';
import { Constants } from './Constants';
import { Parser } from './Parser';
import { TableReader } from './TableReader';

export class Reader {
  private parser: Parser;
  private document?: Document;
  public documents: Document[] = [];

  public constructor(source: string) {
    this.parser = new Parser(source);
  }

  public read(): Reader {
    this.documents = [];
    while (this.tryRead()) {
      if (this.document) {
        this.documents.push(this.document);
      }
    }
    return this;
  }

  public tryRead(): boolean {
    this.document = undefined;

    this.parser.tryReadContentLine();

    if (this.parser.token === Constants.TC500_BEGIN_DOCUMENT) {
      // if program is for a TC500 it might start with a % and the line should be skipped
      this.parser.tryReadContentLine();
    }

    const success = this.parser.token == Constants.BEGIN_DOCUMENT;
    if (success) {
      this.parser.tryReadContentLine();

      this.document = new Document();
      this.readHeader();
      this.readTablesAndAttachments();

      if (this.parser.token != Constants.END_DOCUMENT) {
        throw new Error(`Expected end of document 'ED' in LST line ${this.parser.lineNumber}.`);
      }
    }

    return success;
  }

  private readHeader(): void {
    while (this.parser.token != null && !this.parser.token.startsWith(Constants.Table.BEGIN_PREFIX)) {
      if (this.parser.token == Constants.Header.METRIC_MEASURE) {
        this.document!.measuringSystem = MeasuringSystem.METRIC;
      } else if (this.parser.token == Constants.Header.IMPERIAL_MEASURE) {
        this.document!.measuringSystem = MeasuringSystem.IMPERIAL;
      } else {
        throw new Error(`Unknown header line in LST line ${this.parser.lineNumber}.`);
      }

      this.parser.tryReadContentLine();
    }
  }

  private readTablesAndAttachments(): void {
    this.document!.tables = [];
    while (this.parser.token != null) {
      if (this.parser.token.startsWith(Constants.Table.BEGIN_PREFIX)) {
        this.readTable();
      } else if (this.parser.token.startsWith(Constants.Table.ATTACHMENT_START_PREFIX)) {
        this.readAttachment();
      } else {
        break;
      }
    }
  }

  private readTable(): void {
    const tableReader = new TableReader(this.parser);
    tableReader.read();
    this.document!.tables.push(tableReader.table!);
  }

  private readAttachment(): void {
    const attachment = new Attachment(this.parser.token.substring(Constants.Table.ATTACHMENT_START_PREFIX.length).trimEnd());
    const stopToken = `${Constants.Table.ATTACHMENT_STOP_PREFIX}${attachment.name}`;
    while (this.parser.tryReadLine() && !this.parser.token.startsWith(stopToken)) {
      attachment.data.push(this.parser.token);
    }
    this.parser.tryReadContentLine();

    this.document!.attachments.push(attachment);
  }
}
