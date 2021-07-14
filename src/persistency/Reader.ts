/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

    const success = this.parser.token == Constants.BEGIN_DOCUMENT;
    if (success) {
      this.parser.tryReadContentLine();

      this.document = new Document();
      this.readHeader();
      this.readTables();

      if (this.parser.token != Constants.END_DOCUMENT) {
        throw `Expected end of document 'ED' in LST line ${this.parser.lineNumber}.`;
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
        throw `Unknown header line in LST line ${this.parser.lineNumber}.`;
      }

      this.parser.tryReadContentLine();
    }
  }

  private readTables(): void {
    this.document!.tables = [];
    while (this.parser.token != null && this.parser.token.startsWith(Constants.Table.BEGIN_PREFIX)) {
      this.readTable();
    }
  }

  private readTable(): void {
    const tableReader = new TableReader(this.parser);
    tableReader.read();
    this.document!.tables.push(tableReader.table!);
  }
}
