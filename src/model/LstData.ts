import 'reflect-metadata';
import { ColumnDescription, ValueType } from './ColumnDescription';
import { ColumnDescriptions } from './ColumnDescriptions';
import { DataSet } from './DataSet';
import {
  DataSetMillimeter,
  DataSetKilogram,
  DataSetMinutes,
  DataSetSeconds,
  DataSetKilogramPerLiter,
  DataSetMetersPerMinute,
  DataSetWatt,
  DataSetMetersPerSquareSeconds,
  DataSetHertz,
  DataSetBar,
  DataSetSquareMillimeter,
  DataSetDegrees,
  DataSetAny,
  DataSetNumber,
  DataSetString,
  DataSetBool,
  DataSetMetersPerSecond,
} from './DataSetValues';

type ProxyFactory = (dataSet: DataSet) => { value: any };
type ColumnDescriptionFactory = () => ColumnDescription;
const lstDataMap = new WeakMap<any, Record<string, { proxyFactory: ProxyFactory; columnDescriptionFactory: ColumnDescriptionFactory }>>();

const dataSetClassByUnit = {
  mm: DataSetMillimeter,
  kg: DataSetKilogram,
  min: DataSetMinutes,
  s: DataSetSeconds,
  'kg/dm3': DataSetKilogramPerLiter,
  'm/min': DataSetMetersPerMinute,
  'm/s': DataSetMetersPerSecond,
  W: DataSetWatt,
  'm/s2': DataSetMetersPerSquareSeconds,
  Hz: DataSetHertz,
  bar: DataSetBar,
  mm2: DataSetSquareMillimeter,
  deg: DataSetDegrees,
};

interface LstDataOptions<T> {
  name?: string;
  unit?: keyof typeof dataSetClassByUnit;
  read?: (value: string, unit: string) => T;
  write?: (value: T, unit: string) => string;
  default?: T;
}

function getDefaultValue<T>(type: any, options?: LstDataOptions<T>): any {
  switch (type) {
    case Number:
      return options?.default ?? 0;
    case String:
      return options?.default ?? '';
    case Boolean:
      return options?.default ?? false;
    default:
      return options?.default;
  }
}

function getProxyFactory<T>(type: any, propertyName: string, id: number, options?: LstDataOptions<T>): ProxyFactory {
  if (options && options.read && options.write) {
    return (dataSet) => new DataSetAny<T>(dataSet, id, getDefaultValue(type, options), options.read!, options.write!);
  } else if (options?.read || options?.write) {
    throw new Error(`You need to specify both, read and write in options to @LstData for ${propertyName}`);
  }
  switch (type) {
    case Number:
      const dataSetClass = options?.unit ? dataSetClassByUnit[options.unit] ?? DataSetNumber : DataSetNumber;
      return (dataSet) => new dataSetClass(dataSet, id, getDefaultValue(type, options));
    case String:
      return (dataSet) => new DataSetString(dataSet, id, getDefaultValue(type, options));
    case Boolean:
      return (dataSet) => new DataSetBool(dataSet, id, getDefaultValue(type, options));
    default:
      throw new Error(`Unable to apply @LstData for ${propertyName} to type ${type}. Use read and write options.`);
  }
}

function getColumnDescriptionFactory<T>(type: any, propertyName: string, id: number, options?: LstDataOptions<T>): ColumnDescriptionFactory {
  switch (type) {
    case Number:
    case Boolean:
      return () => ({ id, name: options?.name ?? propertyName, unit: options?.unit ?? '', valueType: ValueType.NUMBER });
    default:
      return () => ({ id, name: options?.name ?? propertyName, unit: options?.unit ?? '', valueType: ValueType.TEXT });
  }
}

export function LstData<T>(id: number, options?: LstDataOptions<T>) {
  return function (target: any, propertyName: string) {
    const type = Reflect.getMetadata('design:type', target, propertyName);
    const proxyFactory = getProxyFactory(type, propertyName, id, options);
    const columnDescriptionFactory = getColumnDescriptionFactory(type, propertyName, id, options);
    const map = lstDataMap.get(target);
    if (map) {
      map[propertyName] = { proxyFactory, columnDescriptionFactory };
    } else {
      lstDataMap.set(target, { [propertyName]: { proxyFactory, columnDescriptionFactory } });
    }
  };
}

interface LstDataAttachmentOptions<T> {
  read: (data: string[]) => T;
  write: (value: T) => string[];
}

const lstDataAttachmentMap = new WeakMap<any, Record<string, LstDataAttachmentOptions<any>>>();

export function LstDataAttachment<T>(options?: LstDataAttachmentOptions<T>) {
  return function (target: any, propertyName: string) {
    const type = Reflect.getMetadata('design:type', target, propertyName);
    if (type !== String && type !== Array && !(options?.read && options?.write)) {
      throw new Error(`@LstAttachment for ${propertyName} must be of type 'string[]' but found ${type}. Please define read and write in the options.`);
    }

    const map = lstDataAttachmentMap.get(target);
    if (map) {
      map[propertyName] = (options ?? {}) as LstDataAttachmentOptions<any>;
    } else {
      lstDataAttachmentMap.set(target, {
        [propertyName]: (options ?? {}) as LstDataAttachmentOptions<any>,
      });
    }
  };
}

export function newColumnDescriptions<T>(factory: new (...args: any[]) => T): ColumnDescriptions {
  const map = lstDataMap.get(factory.prototype);
  if (!map) {
    throw new Error(`Type ${factory} is not decorated with @LstData decorator.`);
  }
  return new ColumnDescriptions(Object.values(map).map((lstData) => lstData.columnDescriptionFactory()));
}

export function newDataSet<T, ARGS>(factory: new (...args: ARGS[]) => T, dataSet?: DataSet, ...args: ARGS[]): T & { $dataSet: DataSet } {
  const map = lstDataMap.get(factory.prototype);
  const attachmentMap = lstDataAttachmentMap.get(factory.prototype);
  if (!map && !attachmentMap) {
    throw new Error(`Type ${factory} is not decorated with @LstData not @LstDataAttachment decorator.`);
  }
  const $dataSet = dataSet ?? new DataSet(newColumnDescriptions(factory));
  const instance = Object.assign(new factory(...args), { $dataSet });
  if (map) {
    Object.entries(map).forEach(([propertyName, lstData]) => {
      const proxy = lstData.proxyFactory($dataSet);
      if (!dataSet) {
        proxy.value = proxy.value; // Initialize in dataSet
      }

      const getter = () => proxy.value;
      const setter = (newVal: any) => (proxy.value = newVal);

      delete (<any>instance)[propertyName];
      Object.defineProperty(instance, propertyName, { get: getter, set: setter, enumerable: true, configurable: true });
    });
  }
  if (attachmentMap) {
    Object.entries(attachmentMap).forEach(([propertyName, attachmentDef]) => {
      const getter = attachmentDef.read ? () => attachmentDef.read($dataSet.attachment) : () => $dataSet.attachment;
      const setter = attachmentDef.write ? (v: any) => ($dataSet.attachment = attachmentDef.write(v)) : (v: string[]) => ($dataSet.attachment = v);

      delete (<any>instance)[propertyName];
      Object.defineProperty(instance, propertyName, { get: getter, set: setter, enumerable: true, configurable: true });
    });
  }
  return instance;
}

export function loadDataSet<T, ARGS>(factory: new (...args: ARGS[]) => T, dataSet: DataSet, ...args: ARGS[]): T {
  const instance = newDataSet(factory, dataSet, ...args);
  return (({ $dataSet, ...clone }) => clone)(instance) as any;
}
