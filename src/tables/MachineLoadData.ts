import { LstData } from '../model/LstData';

export class MachineLoadData {
  public static ID = 'MACHINE_LOAD_DATA';

  @LstData(10)
  name!: string;

  @LstData(50)
  loadingType!: string;

  @LstData(60)
  calibrationActive!: boolean;

  @LstData(120)
  measureSheetActive!: boolean;

  @LstData(130, { unit: 'mm' })
  measureRangeX!: number;

  @LstData(140, { unit: 'mm' })
  measureRangeY!: number;

  @LstData(150)
  measuringCorner!: string;

  @LstData(240)
  retractClamps!: boolean;
}
