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
  });
});
