/* eslint-disable security/detect-non-literal-fs-filename */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { Reader, Writer } from '../../src';

describe(Writer.name, () => {
  describe(Writer.prototype.writeDocuments.name, () => {
    before(async () => {
      await fs.promises.mkdir(path.join(__dirname, '../dump'), { recursive: true }).catch(() => {
        // Ignore failure.
      });
    });

    ['01.lst', '0001.stp_Bend1.bnc'].forEach((name) =>
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
  });
});
