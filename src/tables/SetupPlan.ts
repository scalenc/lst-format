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

  @LstData(50)
  company!: string;

  @LstData(60)
  mainProgramName!: string;

  @LstData(70)
  author!: string;

  @LstData(80)
  date!: string;

  @LstData(90)
  order!: string;

  @LstData(100)
  sheetRepetitionCount!: number;

  @LstData(110)
  sheetName!: string;

  @LstData(120)
  size!: number;

  @LstData(130)
  material!: string;

  @LstData(140, { unit: 'kg' })
  sheetWeight!: number;

  @LstData(150, { unit: 'min' })
  processingTime!: number;

  @LstData(160)
  note!: string;

  @LstData(170)
  automated!: boolean;

  @LstData(180)
  generatedByTops!: boolean;

  @LstData(190)
  setupPlanName!: string;

  @LstData(200)
  storageId!: string;

  @LstData(210)
  hasPalletization!: boolean;

  @LstData(220)
  palletizingMode!: number;

  @LstData(230)
  clearPallet!: boolean;

  @LstData(240)
  clearSuctionCups!: boolean;

  @LstData(250)
  palletType!: string;

  @LstData(260, { unit: 'min' })
  processingTimeForPierceLine!: number;

  @LstData(270, { unit: 'mm' })
  cuttingLength!: number;

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
