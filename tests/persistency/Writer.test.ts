/* eslint-disable security/detect-non-literal-fs-filename */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { DocumentBuilder, Reader, Writer } from '../../src';

describe(Writer.name, () => {
  describe(Writer.prototype.writeDocuments.name, () => {
    before(async () => {
      await fs.promises.mkdir(path.join(__dirname, '../dump'), { recursive: true }).catch(() => {
        // Ignore failure.
      });
    });

    ['01.lst', '0001.stp_Bend1.bnc', '01_emptyEntryAtEnd.lst', '01_startWithPercent.lst'].forEach((name) =>
      it(`should read and write '${name}'`, async () => {
        const lst = await fs.promises.readFile(path.join(__dirname, '../data', name), 'latin1');
        const docs = new Reader(lst).read().documents;
        const out = new Writer().writeDocuments(docs);

        await fs.promises.writeFile(path.join(__dirname, '../dump', name), out, 'latin1');
        const actual = await fs.promises.readFile(path.join(__dirname, '../dump', name), 'latin1');
        const ref = await fs.promises.readFile(path.join(__dirname, '../data/refs', name), 'latin1');
        expect(ref.split(/\r?\n/)).deep.members(actual.split(/\r?\n/));
      })
    );

    it('should write sample from README', () => {
      const doc = new DocumentBuilder().table('FERTIGUNG_AUFTRAG_TMP', (t) => t.text(10, 'Jobname').num(50, 'SollAnzahl').data(['JOB43', 1])).document;
      const out = new Writer().writeDocument(doc);
      expect(out.replace(/\r\n/g, '\n')).equals(
        `BD
SET_METRIC
C
BEGIN_FERTIGUNG_AUFTRAG_TMP
C
ZA,MM,2
MM,AT,1,  10,1,1,,'Jobname'                               ,,'',T
MM,AT,1,  50,1,1,,'SollAnzahl'                            ,,'',Z
C
ZA,DA,1
DA,'JOB43',1
C
ENDE_FERTIGUNG_AUFTRAG_TMP
C
ED
`.replace(/\r\n/g, '\n')
      );
    });
  });
});
