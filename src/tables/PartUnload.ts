import { LstData } from '../model/LstData';

export class PartUnload {
  public static ID = 'PART_UNLOAD';

  @LstData(10)
  id!: string;

  @LstData(20, { unit: 'mm' })
  boundsX!: number;

  @LstData(30, { unit: 'mm' })
  boundsY!: number;

  @LstData(40, { unit: 'mm' })
  offsetX!: number;

  @LstData(50, { unit: 'mm' })
  pushOutPathX!: number;

  @LstData(60, { unit: 'mm' })
  pushOutPathY!: number;

  @LstData(70, { unit: 'm/min' })
  pushOutFeed!: number;

  @LstData(80)
  withLightBarrierMonitoring!: boolean;

  @LstData(90)
  withAirBlastSupport!: boolean;

  @LstData(110)
  definedFlap!: number;

  @LstData(120)
  flapClosed!: number;

  @LstData(130)
  manual!: boolean;

  @LstData(140)
  partInRemainderGrid!: boolean;

  @LstData(150)
  separateBeforeOpen!: boolean;

  @LstData(160)
  lowerBeforeSwivel!: boolean;

  @LstData(170)
  pushOutBeforeOpen!: boolean;

  @LstData(180)
  highestPositionAfterSeparation!: boolean;

  // @LstData(200)
  // resetMultiToolOffsetAfterPushOut:   boolean; // ?

  @LstData(570)
  bucketStorageLocation!: number;

  @LstData(580)
  unloadingDevice!: number;

  @LstData(590, { unit: 'mm' })
  liftUnloadingPosition!: number;

  @LstData(600)
  liftUnloadingLocation!: number;

  @LstData(610, { unit: 'mm' })
  liftOffsetX!: number;

  @LstData(620, { unit: 'mm' })
  liftSortOffsetY!: number;

  @LstData(630, { unit: 'mm' })
  liftPartThickness!: number;

  @LstData(640)
  liftSuctionCupGroup1!: number;

  @LstData(650)
  liftSuctionCupGroup2!: number;

  @LstData(660)
  liftSuctionCupGroup3!: number;

  @LstData(670)
  liftSuctionCupGroup4!: number;

  @LstData(680)
  liftSuctionCupGroup5!: number;

  @LstData(690)
  liftVelocityPercent!: number;

  @LstData(700)
  liftAccelerationPercent!: number;

  @LstData(710)
  liftSortVelocityPercent!: number;

  @LstData(720)
  liftSortAccelerationPercent!: number;

  @LstData(740)
  liftUnloadUnderToolHolder!: boolean;

  @LstData(750)
  liftDropFromAbove!: boolean;

  @LstData(760)
  liftFullStackDropFromAbove!: boolean;

  @LstData(770)
  liftUnloadPushedOut!: boolean;

  @LstData(780)
  liftLayDownPart!: boolean;

  @LstData(790)
  liftPlaceUnderTable!: boolean;

  @LstData(800)
  liftFixOnSeparate!: boolean;

  @LstData(810)
  chipFlapClosed!: boolean;

  @LstData(820)
  moveBackAfterPushOut!: boolean;

  @LstData(830)
  optionsForManualUnloading!: number;

  @LstData(840)
  liftSuctionCupGroup6!: number;

  @LstData(860, { unit: 'mm2' })
  minArea!: number;

  @LstData(870, { unit: 'mm2' })
  maxArea!: number;

  @LstData(880, { unit: 'mm' })
  suctionCupFrameDisplacementY!: number;

  @LstData(1000)
  rootTable!: number;

  @LstData(1010)
  outerContourFile!: number;

  @LstData(1020)
  stack!: number;

  @LstData(1030)
  drawingNumber!: string;

  @LstData(1040, { unit: 'mm' })
  desiredLayDownHeight!: number;

  @LstData(1050)
  desiredPlacementMode!: number;

  @LstData(1060)
  desiredUnloadingDevice!: number;

  @LstData(1070, { unit: 'mm' })
  stackBoundsX!: number;

  @LstData(1080, { unit: 'mm' })
  stackBoundsY!: number;

  @LstData(1090, { unit: 'mm' })
  stackThickness!: number;

  @LstData(1100, { unit: 'mm' })
  stackHeight!: number;

  @LstData(1110)
  measurementFrequency!: number;

  @LstData(1120)
  stackPartCount!: number;

  @LstData(1130, { unit: 'mm' })
  palletOffsetX!: number;

  @LstData(1140, { unit: 'mm' })
  palletOffsetY!: number;

  @LstData(1150)
  desiredUnloadingUnit!: number;

  @LstData(1160, { unit: 'mm' })
  suctionCupFrameOffsetX!: number;

  @LstData(1170, { unit: 'mm' })
  suctionCupFrameOffsetY!: number;

  @LstData(1180)
  drawing!: string;

  @LstData(1190)
  drawingFilename!: string;

  @LstData(1200)
  stackGroupNumber!: number;

  @LstData(1210, { unit: 'mm' })
  partOffsetInStackX!: number;

  @LstData(1220, { unit: 'mm' })
  partOffsetInStackY!: number;

  @LstData(1350)
  liftSuctionCupGroup7!: number;

  @LstData(1360)
  closePartGateAfterUnload!: boolean;
}
