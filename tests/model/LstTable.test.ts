/* eslint-disable security/detect-non-literal-fs-filename */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { LstTable, newDocument, Reader } from '../../src';
import { SetupPlan } from '../../src/tables';

describe(LstTable.name, () => {
  describe(newDocument.name, () => {
    it('should construct document with args', async () => {
      class MyDocument {
        constructor(public name: string, public index: number) {}

        @LstTable(SetupPlan.ID, SetupPlan)
        setupPlans!: SetupPlan[];
      }

      const lst = await fs.promises.readFile(path.join(__dirname, '../data/01.lst'), 'latin1');
      const docs = new Reader(lst).read().documents;
      expect(docs).is.of.length(2);

      const myDoc = newDocument(MyDocument, docs[1], 'MyName', 1);
      expect(myDoc.name).equals('MyName');
      expect(myDoc.index).equals(1);
      expect(myDoc.setupPlans).have.lengthOf(1);
      expect(myDoc.setupPlans[0].mainProgramName).equals('JOB43_1');
    });
  });
});
