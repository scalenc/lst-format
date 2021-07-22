import { LstData } from '../model/LstData';

export class PartsInProgram {
  public static ID = 'PARTS_IN_PROGRAM';

  @LstData(10)
  mainProgramName!: string;

  @LstData(30)
  partId!: string;

  @LstData(50)
  fileName!: string;

  @LstData(60)
  count!: number;

  @LstData(70)
  fileNameWithoutExtension!: string;

  @LstData(80, { unit: 'min' })
  processingTime!: number;

  @LstData(90, { unit: 'mm2' })
  area!: number;

  @LstData(100)
  customer!: string;

  @LstData(110)
  partNumber!: string;

  @LstData(120)
  name!: string;

  @LstData(130, { unit: 'mm' })
  sizeX!: number;

  @LstData(140, { unit: 'mm' })
  sizeY!: number;

  @LstData(170)
  toBook!: boolean;

  @LstData(180, { unit: 'mm' })
  centerOfGravityX!: number;

  @LstData(190, { unit: 'mm' })
  centerOfGravityY!: number;

  @LstData(220, { unit: 'mm2' })
  grossArea!: number;

  @LstData(230, { unit: 'mm' })
  sizeZInStack!: number;

  @LstData(240)
  partTypeIndex!: number;

  @LstData(250)
  mirroredCount!: number;

  @LstData(260, { unit: 'deg' })
  angleInFile!: number;

  @LstData(500)
  trumpf!: number;
}
