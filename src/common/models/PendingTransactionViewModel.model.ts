import { Address } from './Address.model';
import { PendingTransactionType } from '@/common/enums/PendingTransactionType.enum';
import { PendingTransactionStatus } from '@/common/enums/PendingTransactionStatus.enum';
import { uint256 } from './uint256.model';
import { AssetType } from '@/common/enums/AssetType.enum';

export class PendingTransactionViewModel
 {
  public id?: string = "";
  public fromPublicAddress: Address = {} as Address;
  public type: PendingTransactionType = {} as PendingTransactionType;
  public status: PendingTransactionStatus = {} as PendingTransactionStatus;
  public statusDescription?: string = "";
  public isSigned: boolean = false;
  public blockNo?: number | string = "";
  public transactionHash: uint256 = {} as uint256;
  public transactionNonce: number | string = "";
  public transactionTimestamp: number | string = "";
  public transactionToAddress: Address = {} as Address;
  public transactionAssetType: AssetType = {} as AssetType;
  public transactionAssetAmount: number | string = "";
  public transactionAssetKey?: string = "";
  public transactionData?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.fromPublicAddress = !obj.fromPublicAddress 
    ? new Address() 
    : new Address(obj.fromPublicAddress);
    this.type = obj.type === null? {} as PendingTransactionType : obj.type;
    this.status = obj.status === null? {} as PendingTransactionStatus : obj.status;
    this.statusDescription = obj.statusDescription === null? "" : obj.statusDescription;
    this.isSigned = obj.isSigned === null? false : obj.isSigned;
    this.blockNo = obj.blockNo === null? "" : obj.blockNo;
    this.transactionHash = obj.transactionHash === null? {} as uint256 : obj.transactionHash;
    this.transactionNonce = obj.transactionNonce === null? "" : obj.transactionNonce;
    this.transactionTimestamp = obj.transactionTimestamp === null? "" : obj.transactionTimestamp;
    this.transactionToAddress = !obj.transactionToAddress 
    ? new Address() 
    : new Address(obj.transactionToAddress);
    this.transactionAssetType = obj.transactionAssetType === null? {} as AssetType : obj.transactionAssetType;
    this.transactionAssetAmount = obj.transactionAssetAmount === null? "" : obj.transactionAssetAmount;
    this.transactionAssetKey = obj.transactionAssetKey === null? "" : obj.transactionAssetKey;
    this.transactionData = obj.transactionData === null? "" : obj.transactionData;
  }
}