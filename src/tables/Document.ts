import { LstTable } from '../model/LstTable';
import { LTTMasterData } from './LTTMasterData';
import { MachineLoadData } from './MachineLoadData';
import { PartsInProgram } from './PartsInProgram';
import { PartsInProgramPos } from './PartsInProgramPos';
import { ProductionOrder } from './ProductionOrder';
import { Program } from './Program';
import { SetupPlan } from './SetupPlan';
import { SheetLoad } from './SheetLoad';
import { SheetLoadData } from './SheetLoadData';
import { SheetTech } from './SheetTech';
import { ToolMasterData } from './ToolMasterData';

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

  @LstTable(PartsInProgram.ID, PartsInProgram)
  partsInProgram: PartsInProgram[] = [];

  @LstTable(PartsInProgramPos.ID, PartsInProgramPos)
  partsInProgramPos: PartsInProgramPos[] = [];

  @LstTable(LTTMasterData.ID, LTTMasterData)
  lttMasterData: LTTMasterData[] = [];

  @LstTable(ToolMasterData.ID, ToolMasterData)
  toolMasterData: ToolMasterData[] = [];

  @LstTable(Program.ID, Program)
  programs: Program[] = [];

  get name(): string {
    return this.setupPlans[0]?.mainProgramName ?? this.productionOrders[0]?.jobName ?? '<unknown>';
  }
}
