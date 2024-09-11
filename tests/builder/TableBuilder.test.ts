import { expect } from 'chai';
import { TableBuilder } from '../../src/builder/TableBuilder';
import { ValueType } from '../../src';

describe(TableBuilder.name, () => {
  it('should build table with data', () => {
    const table = new TableBuilder('TEST_TABLE')
      .num(10, 'Id')
      .text(20, 'Name')
      .mm(30, 'Length')
      .data([
        [1, 'A', 10],
        [2, 'B', 20],
      ])
      .data([3, 'C', 30]).table;
    expect(table.name).equals('TEST_TABLE');
    expect(table.columnDescriptions.columns).deep.equals([
      {
        id: 10,
        name: 'Id',
        unit: '',
        valueType: ValueType.NUMBER,
      },
      {
        id: 20,
        name: 'Name',
        unit: '',
        valueType: ValueType.TEXT,
      },
      {
        id: 30,
        name: 'Length',
        unit: 'mm',
        valueType: ValueType.NUMBER,
      },
    ]);
    expect(table.dataSets.map((d) => d.values)).deep.equals([
      ['1', 'A', '10'],
      ['2', 'B', '20'],
      ['3', 'C', '30'],
    ]);
  });
});
