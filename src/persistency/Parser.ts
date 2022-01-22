/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Constants } from './Constants';

export class Parser {
  private pos: number;

  public get isOk(): boolean {
    return this.pos < this.source.length;
  }
  public get isAtLineEnd(): boolean {
    return this.char === '\r' || this.char === '\n';
  }
  public token = '';
  public char: string | null = null;
  public lineNumber: number;

  public constructor(private source: string) {
    this.pos = -1;
    this.lineNumber = 1;
    this.readNextChar();
  }

  public tryReadContentLine(): boolean {
    this.trySkipWhiteSpacesCommentsOrLineEnd();
    return this.tryReadLine();
  }

  public tryReadLine(): boolean {
    const success = this.isOk;

    const p0 = this.pos;
    while (this.isOk && !this.isAtLineEnd) {
      this.readNextChar();
    }

    this.token = this.source.substring(p0, this.pos);

    if (this.isOk) {
      this.readNextChar(); // Skip end-of-line.
    }

    return success;
  }

  public trySkipWhiteSpacesCommentsOrLineEnd(): void {
    do {
      this.trySkipWhiteSpacesOrLineEnd();
    } while (this.isOk && this.char == Constants.COMMENT && this.tryReadLine() && this.isOk);
    this.token = '';
  }

  public trySkipWhiteSpacesOrLineEnd(): void {
    while (this.isOk && /\s/.test(this.char!)) {
      this.readNextChar();
    }
  }

  public trySkipWhiteSpaces(): void {
    while (this.isOk && !this.isAtLineEnd && /\s/.test(this.char!)) {
      this.readNextChar();
    }
  }

  public tryReadValueOrString(): boolean {
    this.trySkipWhiteSpaces();

    if (!this.isOk) {
      return false;
    }

    if (this.char === Constants.Table.STRING_SEPARATOR) {
      this.readString();
    } else if (this.char == Constants.Table.FIELD_SEPARATOR) {
      this.token = null as unknown as string; // FIXME
    } else {
      this.readValue();
    }

    return true;
  }

  public readValue(): void {
    this.trySkipWhiteSpaces();

    const p0 = this.pos;
    while (this.isOk && this.char != Constants.Table.FIELD_SEPARATOR && !/\s/.test(this.char!)) {
      this.readNextChar();
    }

    this.token = this.source.substring(p0, this.pos);
  }

  public readString(): void {
    this.trySkipWhiteSpaces();

    if (this.char != Constants.Table.STRING_SEPARATOR) {
      throw new Error(`Expected string but found ${this.char} in LST line ${this.lineNumber}.`);
    }
    this.readNextChar();

    const p0 = this.pos;
    while (this.isOk && this.char != Constants.Table.STRING_SEPARATOR) {
      this.readNextChar();
    }

    this.token = this.source.substring(p0, this.pos);

    if (!this.isOk) {
      throw new Error(`Missing end of string in LST line ${this.lineNumber}.`);
    }
    this.readNextChar(); // Skip '\''.
  }

  public tryReadFieldSeparator(): boolean {
    this.trySkipWhiteSpaces();

    if (this.char != Constants.Table.FIELD_SEPARATOR) {
      return false;
    }

    this.readNextChar();
    return true;
  }

  public readNextChar(): void {
    if (this.isOk) {
      if (++this.pos === this.source.length) {
        this.char = null;
      } else {
        let next: string | null = this.source[this.pos];

        if (this.isAtLineEnd) {
          ++this.lineNumber;
          if (this.char === '\r' && next === '\n') {
            if (++this.pos === this.source.length) {
              next = null;
            } else {
              next = this.source[this.pos];
            }
          }
        }

        this.char = next;
      }
    }
  }
}
