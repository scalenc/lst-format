export enum ValueType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
}

export class ColumnDescription {
  public id = 0;
  public name = '';
  public unit = '';
  public valueType = ValueType.TEXT;
}
