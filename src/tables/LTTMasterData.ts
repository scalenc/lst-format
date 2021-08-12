import { LstData } from '../model/LstData';

export class LTTMasterData {
  public static ID = 'LTT_STAMM';

  @LstData(10)
  id!: string;

  @LstData(50)
  description!: string;

  @LstData(80)
  machineType!: string;

  @LstData(90, { unit: 'W' })
  power!: number;

  @LstData(100)
  material!: string;

  @LstData(110, { unit: 'mm' })
  materialThickness!: number;

  @LstData(120, { unit: 'mm' })
  focalLength!: number;

  @LstData(130)
  nozzleType!: string;

  @LstData(140)
  cuttingUnit!: number;

  @LstData(240, { unit: 'mm' })
  kerfL!: number;

  @LstData(350, { unit: 'mm' })
  kerfM!: number;

  @LstData(460, { unit: 'mm' })
  kerfS!: number;

  @LstData(2300)
  parent!: string;
}
