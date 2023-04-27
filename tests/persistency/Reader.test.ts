import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { Reader } from '../../src';

describe(Reader.name, () => {
  describe(Reader.prototype.read.name, () => {
    ['01.lst', '0001.stp_Bend1.bnc'].forEach((name) =>
      it(`should read '${name}'`, async () => {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        const lst = await fs.promises.readFile(path.join(__dirname, '../data', name), 'latin1');
        const docs = new Reader(lst).read().documents;
        expect(docs).length.gt(0);
      })
    );

    it(`should read sample from README`, () => {
      const lst = `BD
SET_METRIC
BEGIN_FERTIGUNG_AUFTRAG_TMP
ZA,MM,6
MM,AT,1,  10,1,1,,'Jobname'                           ,,'',T
MM,AT,1,  50,1,1,,'SollAnzahl'                        ,,'',Z
MM,AT,1,  60,1,1,,'IstAnzahl'                         ,,'',z
ZA,DA,1
DA,'JOB43',1,1
ENDE_FERTIGUNG_AUFTRAG_TMP
ED`;
      const docs = new Reader(lst).read().documents;
      expect(docs).lengthOf(1);
      expect(docs[0].tables).lengthOf(1);
      expect(docs[0].tables[0].name).equals('FERTIGUNG_AUFTRAG_TMP');
    });
  });
});
