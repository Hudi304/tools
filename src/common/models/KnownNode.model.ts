
export class KnownNode
 {
  public nodeAddress?: string = "";
  public nodeUrl?: string = "";
  public isTrusted: boolean = false;
  public acceptsTransactions: boolean = false;
  public blockNo: number | string = "";
  public blockHash?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.nodeAddress = obj.nodeAddress === null? "" : obj.nodeAddress;
    this.nodeUrl = obj.nodeUrl === null? "" : obj.nodeUrl;
    this.isTrusted = obj.isTrusted === null? false : obj.isTrusted;
    this.acceptsTransactions = obj.acceptsTransactions === null? false : obj.acceptsTransactions;
    this.blockNo = obj.blockNo === null? "" : obj.blockNo;
    this.blockHash = obj.blockHash === null? "" : obj.blockHash;
  }
}