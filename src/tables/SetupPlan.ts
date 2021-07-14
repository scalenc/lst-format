import { LstData } from '../model/LstData';

export class SetupPlan {
  public static ID = 'EINRICHTEPLAN_INFO';

  @LstData(10)
  machine!: string;

  @LstData(20)
  machineType!: string;

  @LstData(30)
  control!: string;

  @LstData(40)
  controlVersion!: string;

  @LstData(60)
  mainProgramName!: string;

  @LstData(100)
  sheetRepetitionCount!: number;

  @LstData(150)
  processingTime!: string;

  @LstData(270)
  cuttingLength!: string;

  @LstData(280)
  machineViewerName!: string;

  @LstData(360)
  platformType!: string;

  @LstData(370)
  powerClass!: string;

  @LstData(380)
  softwareVersion!: string;

  @LstData(390, { unit: 'mm' })
  workingRangeX!: number;

  @LstData(400, { unit: 'mm' })
  workingRangeY!: number;
}
