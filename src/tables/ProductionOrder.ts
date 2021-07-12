import { LstData } from '../model/LstData';

export class ProductionOrder {
  public static ID = 'FERTIGUNG_AUFTRAG_TMP';

  @LstData(10)
  jobName!: string;

  @LstData(20)
  productionOrderName!: string;

  @LstData(30)
  productionStatus!: string;

  @LstData(40)
  programName!: string;

  @LstData(50)
  targetCount!: number;
}
