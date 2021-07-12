import { LstData, LstDataAttachment } from '../model/LstData';

export class Program {
  static ID = 'PROGRAMM';

  @LstData(10)
  name!: string;

  @LstData(20)
  type!: string;

  @LstData(30)
  description!: string;

  @LstData(40, { unit: 'min' })
  processingTime!: number;

  @LstData(50)
  fileType!: string;

  @LstData(60)
  increaseRecordNumber!: boolean;

  @LstData(70)
  partTypeIndex!: number;

  @LstDataAttachment()
  data!: string[];
}
