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
}
