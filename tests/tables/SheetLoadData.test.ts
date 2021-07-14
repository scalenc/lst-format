import { expect } from 'chai';
import { ColumnDescriptions, DataSet, newDataSet, ValueType } from '../../src';
import { SheetLoadData } from '../../src/tables';

describe(SheetLoadData.name, () => {
  it('should be constructable and usable', () => {
    const sheetLoadData = new SheetLoadData();
    sheetLoadData.loadingType = 'ABC';
    expect(sheetLoadData.loadingType).equals('ABC');
  });

  it('should be constructable with DataSet', () => {
    const dataSet = new DataSet(new ColumnDescriptions([{ id: 10, name: 'Name', valueType: ValueType.TEXT, unit: '' }]));
    const sheetLoadData = newDataSet(SheetLoadData, dataSet);

    sheetLoadData.name = 'ABC';
    expect(sheetLoadData.name).equals('ABC');

    sheetLoadData.loadingType = 'ABC';
    expect(sheetLoadData.loadingType).equals('');
  });

  it('should allow to generate column descriptions', () => {
    const sheetLoadData = newDataSet(SheetLoadData);

    sheetLoadData.name = 'ABC';
    expect(sheetLoadData.name).equals('ABC');

    sheetLoadData.loadingType = 'ABC';
    expect(sheetLoadData.loadingType).equals('ABC');

    sheetLoadData.xOffsetSheetPosition = 10;
    expect(sheetLoadData.xOffsetSheetPosition).equals(10);

    sheetLoadData.doubleSheetDetectionActive = true;
    expect(sheetLoadData.doubleSheetDetectionActive).is.true;
  });

  it('should be copyable', () => {
    const sheetLoadData = newDataSet(SheetLoadData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sheetLoadDataCopy = (({ $dataSet, ...copy }) => copy)(sheetLoadData);

    sheetLoadData.name = 'ABC';
    sheetLoadDataCopy.name = 'XYZ';
    expect(sheetLoadData.name).equals('ABC');
    expect(sheetLoadDataCopy.name).equals('XYZ');
  });
});
