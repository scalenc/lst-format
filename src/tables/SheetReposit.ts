import { LstData } from '../model/LstData';

export class SheetReposit {
  public static ID = 'SHEET_REPOSIT';

  @LstData(10)
  name!: string;

  @LstData(20, { unit: 'mm' })
  pathX!: number;

  @LstData(30, { unit: 'mm' })
  pathY!: number;

  @LstData(870, { unit: 'mm' })
  clampingPositionX!: number;

  @LstData(880, { unit: 'mm' })
  clampingPositionY!: number;
}
