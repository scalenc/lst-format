import { Table, ValueType } from '../model';

export class TableBuilder {
  constructor(name: string) {
    this.table = new Table(name);
  }

  table: Table;

  text(id: number, name: string, unit?: string): TableBuilder {
    this.table.addColumn(id, name, unit ?? '', ValueType.TEXT);
    return this;
  }

  num(id: number, name: string, unit?: string): TableBuilder {
    this.table.addColumn(id, name, unit ?? '', ValueType.NUMBER);
    return this;
  }

  bool(id: number, name: string, unit?: string): TableBuilder {
    this.table.addColumn(id, name, unit ?? '', ValueType.BOOLEAN);
    return this;
  }

  enum(id: number, name: string, unit?: string): TableBuilder {
    this.table.addColumn(id, name, unit ?? '', ValueType.ENUM);
    return this;
  }

  mm(id: number, name: string): TableBuilder {
    return this.num(id, name, 'mm');
  }

  kg(id: number, name: string): TableBuilder {
    return this.num(id, name, 'kg');
  }

  min(id: number, name: string): TableBuilder {
    return this.num(id, name, 'min');
  }

  s(id: number, name: string): TableBuilder {
    return this.num(id, name, 's');
  }

  kg_dm3(id: number, name: string): TableBuilder {
    return this.num(id, name, 'kg/dm3');
  }

  m_min(id: number, name: string): TableBuilder {
    return this.num(id, name, 'm/min');
  }

  m_s(id: number, name: string): TableBuilder {
    return this.num(id, name, 'm/s');
  }

  W(id: number, name: string): TableBuilder {
    return this.num(id, name, 'W');
  }

  m_s2(id: number, name: string): TableBuilder {
    return this.num(id, name, 'm/s2');
  }

  Hz(id: number, name: string): TableBuilder {
    return this.num(id, name, 'Hz');
  }

  bar(id: number, name: string): TableBuilder {
    return this.num(id, name, 'bar');
  }

  mm2(id: number, name: string): TableBuilder {
    return this.num(id, name, 'mm2');
  }

  deg(id: number, name: string): TableBuilder {
    return this.num(id, name, 'deg');
  }

  data(values: (number | string | boolean)[]): TableBuilder {
    this.table.addDataSet().values = values.map((x) => `${x}`);
    return this;
  }
}
