import { uint256 } from './uint256.model';
import { TransactionReceiptDataModel } from './TransactionReceiptDataModel.model';

export class BlockDataModel
 {
  public id: number | string = "";
  public blockNo: number | string = "";
  public parentHash: uint256 = {} as uint256;
  public blockHash: uint256 = {} as uint256;
  public stateRoot: uint256 = {} as uint256;
  public isProcessed: boolean = false;
  public transactionReceipts?: TransactionReceiptDataModel[] = [];

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.blockNo = obj.blockNo === null? "" : obj.blockNo;
    this.parentHash = obj.parentHash === null? {} as uint256 : obj.parentHash;
    this.blockHash = obj.blockHash === null? {} as uint256 : obj.blockHash;
    this.stateRoot = obj.stateRoot === null? {} as uint256 : obj.stateRoot;
    this.isProcessed = obj.isProcessed === null? false : obj.isProcessed;
    this.transactionReceipts = obj.transactionReceipts?.filter((item: any) => item !== undefined)
      .map((item: any) => new TransactionReceiptDataModel(item)) || [];
  }
}