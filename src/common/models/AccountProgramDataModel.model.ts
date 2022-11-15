import { AccountDataModel } from './AccountDataModel.model';

export class AccountProgramDataModel
 {
  public id: number | string = "";
  public accountId: number | string = "";
  public programData?: string = "";
  public account: AccountDataModel = {} as AccountDataModel;

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.accountId = obj.accountId === null? "" : obj.accountId;
    this.programData = obj.programData === null? "" : obj.programData;
    this.account = !obj.account 
    ? new AccountDataModel() 
    : new AccountDataModel(obj.account);
  }
}