import { LstData } from '../model/LstData';

function toHex(v: number): string {
  return v.toString(16).toUpperCase().padStart(8, '0');
}

function fromHex(v: string): number {
  return parseInt(v, 16);
}

export class SheetLoad {
  public static ID = 'SHEET_LOAD';
 
  @LstData(10)  
  name!: string;

  @LstData(580)
  doubleSheetDetectionActive!: boolean;

  @LstData(660) 
  calibrationActive!: boolean;
  
  @LstData(630) 
  measureSheetActive!: boolean;
  
  @LstData(640, { unit: 'mm' }) 
  measureRangeX!: number;
  
  @LstData(650, { unit: 'mm' }) 
  measureRangeY!: number;
  
  @LstData(700) 
  measuringCorner!: string;
  
  @LstData(820)
  sheetAlignment!: boolean;

  @LstData(590)
  peelingType!: string;

  @LstData(500)
  loadingType!: string;

  @LstData(810)
  suctionCupSelectionType!: string;

  @LstData(720)
  fanningMagnet!: boolean;;

  @LstData(730)
  rotatingCylinder!: boolean;

  @LstData(110, { read: fromHex, write: toHex, default: 0 })
  suctionCup1!: number;

  @LstData(110, { read: fromHex, write: toHex, default: 0 })
  suctionCup2!: number;
}
