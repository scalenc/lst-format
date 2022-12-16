import { LstData } from '../model/LstData';

export class ToolMasterData {
  public static ID = 'WZG_STAMM';

  @LstData(20)
  id!: string;

  @LstData(40)
  duplicate!: number;

  @LstData(40)
  punch!: number;

  @LstData(70)
  index!: number;

  @LstData(80)
  type!: number;

  @LstData(90)
  whisperTool!: number;

  @LstData(100)
  multiTool!: number;

  @LstData(130)
  description!: string;

  @LstData(160)
  rotation!: number;

  @LstData(170)
  mountingAngle!: number;

  @LstData(180, { unit: 'mm' })
  length1!: number;

  @LstData(190, { unit: 'mm' })
  length2!: number;

  @LstData(200, { unit: 'mm' })
  length3!: number;

  @LstData(210, { unit: 'mm' })
  length4!: number;

  @LstData(220, { unit: 'mm' })
  length5!: number;

  @LstData(230, { unit: 'mm' })
  length6!: number;

  @LstData(240, { unit: 'm/min' })
  feedMin!: number;

  @LstData(250, { unit: 'm/min' })
  feedMax!: number;

  @LstData(380, { unit: 'mm' })
  multiToolOffsetX!: number;

  @LstData(390, { unit: 'mm' })
  multiToolOffsetY!: number;

  @LstData(600, { unit: 'mm' })
  toolContourSizeX!: number;

  @LstData(610, { unit: 'mm' })
  toolContourSizeY!: number;

  @LstData(620, { unit: 'mm' })
  toolContourDiameter!: number;

  @LstData(630, { unit: 'mm' })
  toolContourCornerRadius!: number;

  @LstData(640, { unit: 'deg' })
  toolContourAngle!: number;

  @LstData(650, { unit: 'mm' })
  immersionDepth!: number;

  @LstData(660, { unit: 'mm' })
  toolWebThickness1!: number;

  @LstData(670, { unit: 'mm' })
  toolWebThickness2!: number;

  @LstData(680, { unit: 'mm' })
  cuttingEdgeRadius1!: number;

  @LstData(690, { unit: 'mm' })
  cuttingEdgeRadius2!: number;

  @LstData(700, { unit: 'mm' })
  cuttingEdgeRadius3!: number;

  @LstData(710, { unit: 'mm' })
  cuttingEdgeRadius4!: number;

  @LstData(720, { unit: 'mm' })
  interspace1!: number;

  @LstData(730, { unit: 'mm' })
  interspace2!: number;

  @LstData(740, { unit: 'mm' })
  interspace3!: number;

  @LstData(750, { unit: 'mm' })
  interspace4!: number;

  @LstData(760, { unit: 'deg' })
  offsetAngle!: number;

  @LstData(770, { unit: 'mm' })
  formingResultHeight!: number;

  @LstData(810, { unit: 'mm' })
  coreHoleDiameter!: number;

  @LstData(820, { unit: 'mm' })
  threadLead!: number;

  @LstData(1010, { unit: 'mm' })
  chamferHeight!: number;
}
