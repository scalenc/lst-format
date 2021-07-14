import { ColumnDescriptions } from './ColumnDescriptions';

export class DataSet {
  public columnDescriptions: ColumnDescriptions;
  public values: string[] = [];
  public attachment: string[] = [];

  public constructor(columnDescriptions: ColumnDescriptions) {
    this.columnDescriptions = columnDescriptions;
  }

  public hasId(id: number): boolean {
    const index = this.columnDescriptions.indexById(id);
    return index !== -1;
  }

  public byId(id: number): string | undefined {
    const index = this.columnDescriptions.indexById(id);
    // eslint-disable-next-line security/detect-object-injection
    return index === -1 ? undefined : this.values[index];
  }

  public numberById(id: number): number | undefined {
    const value = this.byId(id);
    if (!value) {
      return undefined;
    }
    const number = +value;
    return Number.isNaN(number) ? undefined : number;
  }

  public boolById(id: number): boolean | undefined {
    const number = this.numberById(id);
    return typeof number === 'undefined' ? undefined : this.numberById(id) !== 0;
  }

  public trySetById(id: number, value: string): boolean {
    const index = this.columnDescriptions.indexById(id);
    if (index >= 0) {
      // eslint-disable-next-line security/detect-object-injection
      this.values[index] = value;
      return true;
    }
    return false;
  }

  public trySetNumberById(id: number, value: number): boolean {
    return this.trySetById(id, `${value}`);
  }

  public trySetBoolById(id: number, value: boolean): boolean {
    return this.trySetById(id, value ? '1' : '0');
  }
}
