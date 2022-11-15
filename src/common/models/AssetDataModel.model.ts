import { Address } from './Address.model';
import { AssetType } from '@/common/enums/AssetType.enum';
import { AccountStateDataModel } from './AccountStateDataModel.model';

export class AssetDataModel
 {
  public id: number | string = "";
  public accountStateId: number | string = "";
  public ownerAddress: Address = {} as Address;
  public type: AssetType = {} as AssetType;
  public key?: string = "";
  public balance: number | string = "";
  public data?: string = "";
  public accountState: AccountStateDataModel = {} as AccountStateDataModel;

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.accountStateId = obj.accountStateId === null? "" : obj.accountStateId;
    this.ownerAddress = !obj.ownerAddress 
    ? new Address() 
    : new Address(obj.ownerAddress);
    this.type = obj.type === null? {} as AssetType : obj.type;
    this.key = obj.key === null? "" : obj.key;
    this.balance = obj.balance === null? "" : obj.balance;
    this.data = obj.data === null? "" : obj.data;
    this.accountState = !obj.accountState 
    ? new AccountStateDataModel() 
    : new AccountStateDataModel(obj.accountState);
  }
}