
export class ExplorerBlock
 {
  public blockId: number | string = "";
  public blockNo: number | string = "";
  public parentHash?: string = "";
  public blockHash?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.blockId = obj.blockId === null? "" : obj.blockId;
    this.blockNo = obj.blockNo === null? "" : obj.blockNo;
    this.parentHash = obj.parentHash === null? "" : obj.parentHash;
    this.blockHash = obj.blockHash === null? "" : obj.blockHash;
  }
}