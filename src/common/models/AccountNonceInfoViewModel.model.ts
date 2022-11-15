
export class AccountNonceInfoViewModel
 {
  public accountId: number | string = "";
  public registeredNonce: number | string = "";
  public pendingNonce?: number | string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.accountId = obj.accountId === null? "" : obj.accountId;
    this.registeredNonce = obj.registeredNonce === null? "" : obj.registeredNonce;
    this.pendingNonce = obj.pendingNonce === null? "" : obj.pendingNonce;
  }
}