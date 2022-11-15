
export class ExplorerTransaction
 {
  public blockId: number | string = "";
  public blockNo: number | string = "";
  public transactionNo: number | string = "";
  public fromAddress?: string = "";
  public toAddress?: string = "";
  public nonce: number | string = "";
  public isRejected: boolean = false;
  public isProgramExecution: boolean = false;
  public transactionHash?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.blockId = obj.blockId === null? "" : obj.blockId;
    this.blockNo = obj.blockNo === null? "" : obj.blockNo;
    this.transactionNo = obj.transactionNo === null? "" : obj.transactionNo;
    this.fromAddress = obj.fromAddress === null? "" : obj.fromAddress;
    this.toAddress = obj.toAddress === null? "" : obj.toAddress;
    this.nonce = obj.nonce === null? "" : obj.nonce;
    this.isRejected = obj.isRejected === null? false : obj.isRejected;
    this.isProgramExecution = obj.isProgramExecution === null? false : obj.isProgramExecution;
    this.transactionHash = obj.transactionHash === null? "" : obj.transactionHash;
  }
}