import { uint256 } from './uint256.model';
import { AccountDataModel } from './AccountDataModel.model';
import { TransactionReceiptDataModel } from './TransactionReceiptDataModel.model';
import { AssetDataModel } from './AssetDataModel.model';

export class AccountStateDataModel
 {
  public id: number | string = "";
  public accountId: number | string = "";
  public createdInTransactionId: number | string = "";
  public nonce: number | string = "";
  public stateHash: uint256 = {} as uint256;
  public assetsHash: uint256 = {} as uint256;
  public dataHash: uint256 = {} as uint256;
  public data?: string = "";
  public isCurrent: boolean = false;
  public account: AccountDataModel = {} as AccountDataModel;
  public createdInTransaction: TransactionReceiptDataModel = {} as TransactionReceiptDataModel;
  public assets?: AssetDataModel[] = [];

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.accountId = obj.accountId === null? "" : obj.accountId;
    this.createdInTransactionId = obj.createdInTransactionId === null? "" : obj.createdInTransactionId;
    this.nonce = obj.nonce === null? "" : obj.nonce;
    this.stateHash = obj.stateHash === null? {} as uint256 : obj.stateHash;
    this.assetsHash = obj.assetsHash === null? {} as uint256 : obj.assetsHash;
    this.dataHash = obj.dataHash === null? {} as uint256 : obj.dataHash;
    this.data = obj.data === null? "" : obj.data;
    this.isCurrent = obj.isCurrent === null? false : obj.isCurrent;
    this.account = !obj.account 
    ? new AccountDataModel() 
    : new AccountDataModel(obj.account);
    this.createdInTransaction = !obj.createdInTransaction 
    ? new TransactionReceiptDataModel() 
    : new TransactionReceiptDataModel(obj.createdInTransaction);
    this.assets = obj.assets?.filter((item: any) => item !== undefined)
      .map((item: any) => new AssetDataModel(item)) || [];
  }
}