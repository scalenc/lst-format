import { ColumnDescription } from './ColumnDescription';

export class ColumnDescriptions {
  constructor(public columns: ColumnDescription[] = []) {}

  get length(): number {
    return this.columns.length;
  }

  public indexById(id: number): number {
    return this.columns.findIndex((x) => x.id === id);
  }

  public push(columnDescription: ColumnDescription): void {
    this.columns.push(columnDescription);
  }
}
