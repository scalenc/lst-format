/* eslint-disable security/detect-non-literal-fs-filename */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { Reader, newDocument } from '../../src';
import { Document } from '../../src/tables';

describe(Document.name, () => {
  it('should load document from LST', async () => {
    const lst = await fs.promises.readFile(path.join(__dirname, '../data/01.lst'), 'latin1');
    const docs = new Reader(lst).read().documents;
    expect(docs).is.of.length(2);

    const first = newDocument(Document, docs[0]);
    expect(first.productionOrders).is.of.length(1);
    expect(first.productionOrders[0].jobName).equals('JOB43');

    const second = newDocument(Document, docs[1]);
    expect(second.name).equals('JOB43_1');

    expect(second.programs).is.lengthOf(2);
    expect(second.programs[0].data[0]).equals('N10MSG("HAUPTPROGRAMMNUMMER,JOB43_1" )');
  });
});
