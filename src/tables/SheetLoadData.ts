import { LstData } from '../model/LstData';

function toHex(v: number): string {
  return v.toString(16).toUpperCase().padStart(8, '0');
}

function fromHex(v: string): number {
  return parseInt(v, 16);
}

export class SheetLoadData {
  public static ID = 'SHEET_LOAD_DATA';

  @LstData(10)
  name!: string;

  @LstData(30)
  doubleSheetDetectionActive!: boolean;

  @LstData(60)
  sheetAlignment!: boolean;

  @LstData(80)
  peelingType!: string;

  @LstData(230)
  loadingType!: string;

  @LstData(300)
  suctionCupSelectionType!: string;

  @LstData(350)
  fanningMagnet!: boolean;

  @LstData(360)
  rotatingCylinder!: boolean;

  @LstData(370)
  backStopCorner!: string;

  @LstData(510, { unit: 'mm' })
  xOffsetSheetPosition!: number;

  @LstData(110, { read: fromHex, write: toHex, default: 0 })
  suctionCup1!: number;

  @LstData(120, { read: fromHex, write: toHex, default: 0 })
  suctionCup2!: number;

  @LstData(130, { read: fromHex, write: toHex, default: 0 })
  suctionCup3!: number;

  @LstData(140, { read: fromHex, write: toHex, default: 0 })
  suctionCup4!: number;

  @LstData(310, { read: fromHex, write: toHex, default: 0 })
  suctionCup5!: number;

  @LstData(320, { read: fromHex, write: toHex, default: 0 })
  suctionCup6!: number;

  @LstData(330, { read: fromHex, write: toHex, default: 0 })
  suctionCup7!: number;

  @LstData(340, { read: fromHex, write: toHex, default: 0 })
  suctionCup8!: number;

  @LstData(380, { unit: 'mm' })
  console1X!: number;

  @LstData(390, { unit: 'mm' })
  console2X!: number;

  @LstData(400, { unit: 'mm' })
  console3X!: number;

  @LstData(410, { unit: 'mm' })
  console1XShuttle1Y!: number;

  @LstData(420, { unit: 'mm' })
  console1XShuttle2Y!: number;

  @LstData(430, { unit: 'mm' })
  console1XShuttle3Y!: number;

  @LstData(440, { unit: 'mm' })
  console2XShuttle1Y!: number;

  @LstData(450, { unit: 'mm' })
  console2XShuttle2Y!: number;

  @LstData(460, { unit: 'mm' })
  console2XShuttle3Y!: number;

  @LstData(470, { unit: 'mm' })
  console3XShuttle1Y!: number;

  @LstData(480, { unit: 'mm' })
  console3XShuttle2Y!: number;

  @LstData(490, { unit: 'mm' })
  console3XShuttle3Y!: number;

  @LstData(500)
  consolesNotUsed!: number;

  @LstData(520)
  console1ShuttlesNotUsed!: number;

  @LstData(530)
  console2ShuttlesNotUsed!: number;

  @LstData(540)
  console3ShuttlesNotUsed!: number;
}
