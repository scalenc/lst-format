import { Constants } from './Constants';
import { Parser } from './Parser';

export class TableLineReader {
  connectFields = false;
  public fields: string[] = [];

  public constructor(private parser: Parser) {}

  public read(): void {
    this.fields = [];

    this.parser.trySkipWhiteSpacesCommentsOrLineEnd();
    while (this.parser.tryReadValueOrString()) {
      this.addField(this.parser.token);

      if (!this.tryReadLineOrFieldConnector()) break;

      if (!this.parser.tryReadFieldSeparator()) break;

      if (!this.tryReadLineOrFieldConnector()) {
        this.addField(Constants.Table.EMPTY_FIELD_TOKEN);
        break;
      }
    }
  }

  private addField(value: string): void {
    if (this.connectFields) {
      if (this.fields.length === 0) {
        throw new Error(`Corrupt field entry in LST line ${this.parser.lineNumber}.`);
      }

      this.fields[this.fields.length - 1] += value;
    } else {
      this.fields.push(value);
    }
  }

  private tryReadLineOrFieldConnector(): boolean {
    this.connectFields = false;
    let isWithinLine = true;

    this.parser.trySkipWhiteSpaces();
    if (this.parser.isAtLineEnd) {
      this.parser.readNextChar();
      if (!this.parser.isOk) {
        isWithinLine = false;
      } else if (this.parser.char === Constants.Table.FIELD_CONNECTOR) {
        this.connectFields = true;
        this.parser.readNextChar();
      } else if (this.parser.char === Constants.Table.LINE_CONNECTOR) {
        this.parser.readNextChar();
      } else {
        isWithinLine = false;
      }
    }
    return isWithinLine;
  }
}
