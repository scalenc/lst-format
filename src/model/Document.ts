import { Attachment } from './Attachment';
import { Table } from './Table';

export enum MeasuringSystem {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL',
}

export class Document {
  public preamble: string | undefined = undefined;
  public measuringSystem = MeasuringSystem.METRIC;
  public tables: Table[] = [];
  public attachments: Attachment[] = [];

  public indexByName(name: string): number {
    return this.tables.findIndex((x) => x.name === name);
  }

  public get(name: string): Table | undefined {
    const index = this.indexByName(name);
    // eslint-disable-next-line security/detect-object-injection
    return index === -1 ? undefined : this.tables[index];
  }

  public getOrAdd(name: string): Table {
    const index = this.indexByName(name);
    if (index === -1) {
      const t = new Table(name);
      this.tables.push(t);
      return t;
    }
    // eslint-disable-next-line security/detect-object-injection
    return this.tables[index];
  }
}
