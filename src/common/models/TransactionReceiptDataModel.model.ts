import { Address } from './Address.model';
import { uint256 } from './uint256.model';
import { BlockDataModel } from './BlockDataModel.model';
import { StateOperationDataModel } from './StateOperationDataModel.model';
import { ChainConfigDataModel } from './ChainConfigDataModel.model';
import { AccountDataModel } from './AccountDataModel.model';
import { AccountStateDataModel } from './AccountStateDataModel.model';

export class TransactionReceiptDataModel
 {
  public id: number | string = "";
  public blockId: number | string = "";
  public blockNo: number | string = "";
  public transactionNo: number | string = "";
  public fromAddress: Address = {} as Address;
  public toAddress: Address = {} as Address;
  public nonce: number | string = "";
  public isRejected: boolean = false;
  public isProgramExecution: boolean = false;
  public transactionHash: uint256 = {} as uint256;
  public block: BlockDataModel = {} as BlockDataModel;
  public stateOperations?: StateOperationDataModel[] = [];
  public chainConfigs?: ChainConfigDataModel[] = [];
  public createdAccounts?: AccountDataModel[] = [];
  public accountStates?: AccountStateDataModel[] = [];

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.blockId = obj.blockId === null? "" : obj.blockId;
    this.blockNo = obj.blockNo === null? "" : obj.blockNo;
    this.transactionNo = obj.transactionNo === null? "" : obj.transactionNo;
    this.fromAddress = !obj.fromAddress 
    ? new Address() 
    : new Address(obj.fromAddress);
    this.toAddress = !obj.toAddress 
    ? new Address() 
    : new Address(obj.toAddress);
    this.nonce = obj.nonce === null? "" : obj.nonce;
    this.isRejected = obj.isRejected === null? false : obj.isRejected;
    this.isProgramExecution = obj.isProgramExecution === null? false : obj.isProgramExecution;
    this.transactionHash = obj.transactionHash === null? {} as uint256 : obj.transactionHash;
    this.block = !obj.block 
    ? new BlockDataModel() 
    : new BlockDataModel(obj.block);
    this.stateOperations = obj.stateOperations?.filter((item: any) => item !== undefined)
      .map((item: any) => new StateOperationDataModel(item)) || [];
    this.chainConfigs = obj.chainConfigs?.filter((item: any) => item !== undefined)
      .map((item: any) => new ChainConfigDataModel(item)) || [];
    this.createdAccounts = obj.createdAccounts?.filter((item: any) => item !== undefined)
      .map((item: any) => new AccountDataModel(item)) || [];
    this.accountStates = obj.accountStates?.filter((item: any) => item !== undefined)
      .map((item: any) => new AccountStateDataModel(item)) || [];
  }
}