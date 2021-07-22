import { LstData } from '../model/LstData';

export class PartsInProgramPos {
  public static ID = 'PARTS_IN_PROGRAM_POS';

  @LstData(10)
  id!: number;

  @LstData(20)
  mainProgramName!: string;

  @LstData(30)
  partId!: string;

  @LstData(60, { unit: 'mm' })
  x!: number;

  @LstData(70, { unit: 'mm' })
  y!: number;

  @LstData(80, { unit: 'mm' })
  sizeX!: number;

  @LstData(90, { unit: 'mm' })
  sizeY!: number;

  @LstData(100, { unit: 'deg' })
  angle!: number;

  @LstData(150, { unit: 'mm' })
  centerOfGravityX!: number;

  @LstData(160, { unit: 'mm' })
  centerOfGravityY!: number;

  @LstData(190)
  removalNumber!: number;

  @LstData(200)
  referencePart!: number;

  @LstData(210)
  unloadTableName!: string;

  @LstData(220)
  palletizingTableName!: string;

  @LstData(240)
  classification!: number;

  @LstData(300)
  palletizationSequenceNumber!: number;

  @LstData(310)
  unloadDataName!: string;

  @LstData(320)
  partTypeIndex!: number;

  @LstData(330)
  mirroredAtY!: boolean;

  @LstData(500)
  trumpf!: number;
}
