import { Table } from './Table';

export enum MeasuringSystem {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL',
}

export class Document {
  public measuringSystem = MeasuringSystem.METRIC;
  public tables: Table[] = [];

  public indexByName(name: string): number {
    return this.tables.findIndex((x) => x.name === name);
  }

  public get(name: string): Table | undefined {
    const index = this.indexByName(name);
    return index === -1 ? undefined : this.tables[index];
  }

  public getOrAdd(name: string): Table {
    const index = this.indexByName(name);
    if (index === -1) {
      const t = new Table(name);
      this.tables.push(t);
      return t;
    }
    return this.tables[index];
  }
}
