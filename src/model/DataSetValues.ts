import { DataSet } from './DataSet';

export interface DataSetValue<T> {
  isDefined: boolean;
  value: T;
}

export class DataSetString implements DataSetValue<string> {
  constructor(private dataset: DataSet, private id: number, private defaultValue: string) {}

  get isDefined(): boolean {
    return this.dataset.hasId(this.id);
  }

  get value(): string {
    return this.dataset.byId(this.id) ?? this.defaultValue;
  }

  set value(v: string) {
    this.dataset.trySetById(this.id, v);
  }
}

export class DataSetNumber implements DataSetValue<number> {
  constructor(private dataset: DataSet, private id: number, private defaultValue: number) {}

  get isDefined(): boolean {
    return this.dataset.hasId(this.id);
  }

  get value(): number {
    return this.dataset.numberById(this.id) ?? this.defaultValue;
  }

  set value(v: number) {
    this.dataset.trySetNumberById(this.id, v);
  }
}

export class DataSetBool implements DataSetValue<boolean> {
  constructor(private dataset: DataSet, private id: number, private defaultValue: boolean) {}

  get isDefined(): boolean {
    return this.dataset.hasId(this.id);
  }

  get value(): boolean {
    return this.dataset.boolById(this.id) ?? this.defaultValue;
  }

  set value(v: boolean) {
    this.dataset.trySetBoolById(this.id, v);
  }
}

export class DataSetAny<T> implements DataSetValue<T> {
  constructor(
    private dataset: DataSet,
    private id: number,
    private defaultValue: T,
    private read: (value: string, unit: string) => T,
    private write: (value: T, unit: string) => string,
  ) {}

  get isDefined(): boolean {
    return this.dataset.hasId(this.id);
  }

  get value(): T {
    const index = this.dataset.columnDescriptions.indexById(this.id);
    if (index < 0) {
      return this.defaultValue;
    }
    const value = this.dataset.values[index];
    if (typeof value === 'undefined') {
      return this.defaultValue;
    }
    return this.read(value, this.dataset.columnDescriptions.columns[index].unit);
  }

  set value(v: T) {
    const index = this.dataset.columnDescriptions.indexById(this.id);
    if (index >= 0) {
      this.dataset.values[index] = this.write(v, this.dataset.columnDescriptions.columns[index].unit);
    }
  }
}

export class DataSetUnit extends DataSetAny<number> {
  constructor(dataset: DataSet, id: number, defaultValue: number, factorsByUnit: Record<string, number>) {
    function getFactor(unit: string) {
      const factor = factorsByUnit[unit];
      if (!factor) {
        throw new Error(`Unknown unit ${unit}`);
      }
      return factor;
    }

    function read(value: string, unit: string): number {
      const number = +value;
      if (Number.isNaN(number)) {
        throw new Error(`Invalid number ${value}`);
      }
      return number * getFactor(unit);
    }

    function write(v: number, unit: string) {
      return `${v / getFactor(unit)}`;
    }

    super(dataset, id, defaultValue, read, write);
  }
}

export class DataSetMillimeter extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      nm: 1e-6,
      um: 1e-3,
      µm: 1e-3,
      mm: 1,
      cm: 10,
      dm: 100,
      m: 1000,
      in: 25.4,
      ft: 304.8,
    });
  }
}

export class DataSetSquareMillimeter extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      nm2: 1e-12,
      um2: 1e-6,
      µm2: 1e-6,
      mm2: 1,
      cm2: 1e2,
      dm2: 1e4,
      m2: 1e6,
      in2: 25.4 * 25.4,
      ft2: 304.8 * 304.8,
    });
  }
}

export class DataSetKilogram extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      g: 1e-3,
      lb: 0.453592,
      kg: 1,
    });
  }
}

export class DataSetMinutes extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      s: 1 / 60,
      min: 1,
      h: 60,
    });
  }
}

export class DataSetSeconds extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      s: 1,
      min: 60,
      h: 60 * 60,
    });
  }
}

export class DataSetKilogramPerLiter extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      'kg/m3': 1e-3,
      'kg/dm3': 1,
      'g/cm3': 1,
      'lb/in3': 0.453592/0.254/0.254/0.254,
    });
  }
}

export class DataSetMetersPerMinute extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      'm/min': 1,
    });
  }
}

export class DataSetMetersPerSecond extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      'mm/s': 1e-3,
      'in/s': 0.0254,
      'm/min': 1 / 60,
      'mm/min': 1e-3 / 60,
      'in/min': 0.0254 / 60,
    });
  }
}

export class DataSetWatt extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      W: 1,
    });
  }
}

export class DataSetMetersPerSquareSeconds extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      'mm/s2': 1e-3,
      'in/s2': 0.0254,
      'm/s2': 1,
    });
  }
}

export class DataSetHertz extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      Hz: 1,
    });
  }
}

export class DataSetBar extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      bar: 1,
    });
  }
}

export class DataSetDegrees extends DataSetUnit {
  constructor(dataset: DataSet, id: number, defaultValue: number) {
    super(dataset, id, defaultValue, {
      deg: 1,
      rad: 180 / Math.PI,
    });
  }
}
