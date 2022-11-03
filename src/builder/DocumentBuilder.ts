import { Document } from '../model';
import { TableBuilder } from './TableBuilder';

export class DocumentBuilder {
  document = new Document();

  table(name: string, builder: (t: TableBuilder) => unknown): DocumentBuilder {
    const tableBuilder = new TableBuilder(name);
    builder(tableBuilder);
    this.document.tables.push(tableBuilder.table);
    return this;
  }
}
