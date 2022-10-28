# TRUMPF LST file format library

[![License](https://img.shields.io/badge/license-BSD3-green)](https://github.com/scalenc/lst-format)
[![NPM version](https://img.shields.io/npm/v/@scalenc/lst-format)](https://www.npmjs.com/package/@scalenc/lst-format)

This is a typescript library to read and write the TRUMPF LST file format.

It comes with a plain class model of the LST file structure and a persistency layer to read this model from a string.

## Installation

```sh
npm install lst-format
yarn add lst-format
pnpm add lst-format
```

## Examples

Sample usage to read TRUMPF LST file

```typescript
import { Reader } from '@scalenc/lst-format';

const lst = `BD
SET_METRIC
BEGIN_FERTIGUNG_AUFTRAG_TMP
ZA,MM,6
MM,AT,1,  10,1,1,,'Jobname'                           ,,'',T
MM,AT,1,  50,1,1,,'SollAnzahl'                        ,,'',Z
ZA,DA,1
DA,'JOB43',1
ENDE_FERTIGUNG_AUFTRAG_TMP
ED`;
const docs = new Reader(lst).read().documents;
```

Sample usage to construct and write TRUMPF LST file

```typescript
import { DocumentBuilder, Writer } from '@scalenc/lst-format';

const doc = new DocumentBuilder().table('FERTIGUNG_AUFTRAG_TMP', (t) => t.text(10, 'Jobname').num(50, 'SollAnzahl').data(['JOB43', 1])).document;
const out = new Writer().writeDocument(doc);
console.log(out);
```

Sample using convenience access layer to standard tables via reflection

```typescript
import { newDocument, Reader, Tables } from '@scalenc/lst-format';

const lst = `BD
SET_METRIC
BEGIN_FERTIGUNG_AUFTRAG_TMP
ZA,MM,6
MM,AT,1,  10,1,1,,'Jobname'                           ,,'',T
MM,AT,1,  50,1,1,,'SollAnzahl'                        ,,'',Z
ZA,DA,1
DA,'JOB43',1
ENDE_FERTIGUNG_AUFTRAG_TMP
ED`;
const docs = new Reader(lst).read().documents;
const doc = newDocument(Tables.Document, docs[0]);
console.log(doc.productionOrders[0].jobName);
```

## Development

Run `yarn` to setup project and install all dependencies.

Run `yarn test` to run all tests.

Run `yarn lint` to check for linting issues.

Run `yarn build` to build.

## License

All rights reserved to ScaleNC GmbH.

Source Code and Binaries licensed under BSD-3-Clause.
