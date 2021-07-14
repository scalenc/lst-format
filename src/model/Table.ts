import { ColumnDescription, ValueType } from './ColumnDescription';
import { ColumnDescriptions } from './ColumnDescriptions';
import { DataSet } from './DataSet';

export class Table {
  public name: string;
  public columnDescriptions: ColumnDescriptions;
  public dataSets: DataSet[];

  public constructor(name?: string) {
    this.name = name ?? '';
    this.columnDescriptions = new ColumnDescriptions();
    this.dataSets = [];
  }

  public columnById(id: number): number {
    return this.columnDescriptions.indexById(id);
  }

  public dataSetIndexById(id: number, value: string): number {
    const column = this.columnById(id);
    // eslint-disable-next-line security/detect-object-injection
    return column === -1 ? -1 : this.dataSets.findIndex((x) => x.values[column] === value);
  }

  public dataSetById(id: number, value: string): DataSet | null {
    const index = this.dataSetIndexById(id, value);
    // eslint-disable-next-line security/detect-object-injection
    return index === -1 ? null : this.dataSets[index];
  }

  public addColumn(id: number, name: string, unit: string, valueType: ValueType): ColumnDescription {
    const c = new ColumnDescription();
    c.id = id;
    c.name = name;
    c.unit = unit;
    c.valueType = valueType;
    this.columnDescriptions.push(c);
    this.dataSets.forEach((x) => x.values.push(null as unknown as string));
    return c;
  }

  public addDataSet(): DataSet {
    const d = new DataSet(this.columnDescriptions);
    this.dataSets.push(d);
    return d;
  }
}
