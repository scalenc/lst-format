import { LstTable } from '../model/LstTable';
import { MachineLoadData } from './MachineLoadData';
import { ProductionOrder } from './ProductionOrder';
import { Program } from './Program';
import { SetupPlan } from './SetupPlan';
import { SheetLoad } from './SheetLoad';
import { SheetLoadData } from './SheetLoadData';
import { SheetTech } from './SheetTech';

export class Document {
  @LstTable(ProductionOrder.ID, ProductionOrder)
  productionOrders: ProductionOrder[] = [];

  @LstTable(SetupPlan.ID, SetupPlan)
  setupPlans: SetupPlan[] = [];

  @LstTable(SheetTech.ID, SheetTech)
  sheetTechs: SheetTech[] = [];

  @LstTable(MachineLoadData.ID, MachineLoadData)
  machineLoadDatas: MachineLoadData[] = [];

  @LstTable(SheetLoad.ID, SheetLoad)
  sheetLoads: SheetLoad[] = [];

  @LstTable(SheetLoadData.ID, SheetLoadData)
  sheetLoadDatas: SheetLoadData[] = [];

  @LstTable(Program.ID, Program)
  programs: Program[] = [];

  get name(): string {
    return this.setupPlans[0]?.mainProgramName ?? this.productionOrders[0]?.jobName ?? '<unknown>';
  }
}
