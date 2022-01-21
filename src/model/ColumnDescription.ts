export enum ValueType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  ENUM = 'ENUM',
  BOOLEAN = 'BOOLEAN',
}

export class ColumnDescription {
  public id = 0;
  public name = '';
  public unit = '';
  public valueType = ValueType.TEXT;
}
