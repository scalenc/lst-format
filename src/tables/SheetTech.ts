import { LstData } from '../model/LstData';

export class SheetTech {
  public static ID = 'SHEET_TECH';

  @LstData(10)
  name!: string;

  @LstData(20, { unit: 'mm' })
  sizeX!: number;

  @LstData(30, { unit: 'mm' })
  sizeY!: number;

  @LstData(40, { unit: 'mm' })
  sizeZ!: number;

  @LstData(240)
  rawMaterialId!: string;

  @LstData(260, { unit: 'kg/dm3' })
  density!: number;

  @LstData(280)
  dynamicLevel!: number;

  @LstData(290)
  materialNumber!: string;

  @LstData(370)
  advancedEvaporateSwitch!: boolean;

  @LstData(380, { unit: 'mm' })
  advancedEvaporateCircleRadius!: number;

  @LstData(390)
  opticalReflectionProperty!: number;

  @LstData(420)
  isPrecut!: boolean;
}
