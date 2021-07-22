/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSet } from './DataSet';
import { Document } from './Document';
import { loadDataSet, newDataSet } from './LstData';

const lstTableMap = new WeakMap<any, Record<string, { name: string; dataSetType: new () => unknown }>>();

export function LstTable(name: string, dataSetType: new () => any) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (target: any, propertyName: string): void {
    const type = Reflect.getMetadata('design:type', target, propertyName);
    if (type !== Array) {
      throw new Error(`Expect @LstTable for ${propertyName} to be used with an array but found ${type}`);
    }

    const tableDef = { name: name.toUpperCase(), dataSetType };

    const map = lstTableMap.get(target);
    if (map) {
      // eslint-disable-next-line security/detect-object-injection
      map[propertyName] = tableDef;
    } else {
      lstTableMap.set(target, { [propertyName]: tableDef });
    }
  };
}

function loadIntoDocument<T>(type: any, instance: T, document: Document, dataSetFactory: (dataSetType: any, dataSet: DataSet) => any) {
  const map = lstTableMap.get(type);
  if (!map) {
    throw new Error(`Type ${type.name} is not decorated with @LstTable decorator.`);
  }

  Object.entries(map).forEach(([propertyName, tableDef]) => {
    const array: any[] = instance[propertyName as keyof T] ?? (instance[propertyName as keyof T] = [] as any);
    document.tables
      .filter((table) => table.name.toUpperCase() === tableDef.name)
      .forEach((table) => {
        table.dataSets.forEach((dataSet) => array.push(dataSetFactory(tableDef.dataSetType, dataSet)));
      });
  });
}

export function newDocument<T, ARGS extends any[]>(constructor: new (...args: ARGS) => T, document: Document, ...args: ARGS): T & { $document: Document } {
  const instance = new constructor(...args);
  loadIntoDocument(constructor.prototype, instance, document, newDataSet);
  return Object.assign(instance, { $document: document });
}

export function loadDocument<T, ARGS extends any[]>(constructor: new (...args: ARGS) => T, document: Document, ...args: ARGS): T {
  const instance = new constructor(...args);
  loadIntoDocument(constructor.prototype, instance, document, loadDataSet);
  return instance;
}
