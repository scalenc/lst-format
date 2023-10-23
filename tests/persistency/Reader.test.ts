import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { Reader } from '../../src';

describe(Reader.name, () => {
  describe(Reader.prototype.read.name, () => {
    ['01.lst', '0001.stp_Bend1.bnc', '01_emptyEntryAtEnd.lst', '01_splitBeforeFieldSeparator.lst', '01_startWithPercent.lst'].forEach((name) =>
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

  it('should read TUBE_TECH', () => {
    const lst = `BD
SET_METRIC
BEGIN_TUBE_TECH
C
ZA,MM,23
MM,AT,1,10,1,1,,,,,T
MM,AT,1,20,1,1,,,,,Z
MM,AT,1,30,1,1,,,,'mm',Z
MM,AT,1,40,1,1,,,,'mm',Z
MM,AT,1,50,1,1,,,,'mm',Z
MM,AT,1,60,1,1,,,,'mm',Z
MM,AT,1,70,1,1,,,,'mm',Z
MM,AT,1,80,1,1,,,,'mm',Z
MM,AT,1,130,1,1,,,,'mm',Z
MM,AT,1,220,1,1,,,,'m/s2',Z
MM,AT,1,230,1,1,,,,'1/s2',Z
MM,AT,1,240,1,1,,,,'mm/min',Z
MM,AT,1,250,1,1,,,,'�/min',Z
MM,AT,1,270,1,1,,,,,T
MM,AT,1,280,1,1,,,,,T
MM,AT,1,290,1,1,,,,,T
MM,AT,1,300,1,1,,,,'mm',Z
MM,AT,1,310,1,1,,,,,T
MM,AT,1,320,1,1,,,,,T
MM,AT,1,330,1,1,,,,,T
MM,AT,1,340,1,1,,,,,T
MM,AT,1,350,1,1,,,,'�',Z
MM,AT,1,400,1,1,,,,'�',Z
C
ZA,DA,1
DA,'1_400X200X25_1_15',1,6000.0,1.5,2.5,20.0,40.0,43.08,43.08,7.0,15.0
 * ,100000.0,43200.0,'St37-15','TTL-1','TUL-1',18.0,'0','none','TRO-7405','Z_1_400X200X25_1_15'
 * ,0.0,0.0
C
ENDE_TUBE_TECH
ED`;
    const docs = new Reader(lst).read().documents;
    expect(docs).lengthOf(1);
    expect(docs[0].tables).lengthOf(1);
    expect(docs[0].tables[0].name).equals('TUBE_TECH');
  });
});
