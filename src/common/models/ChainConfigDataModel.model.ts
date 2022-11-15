import { Address } from './Address.model';
import { TransactionReceiptDataModel } from './TransactionReceiptDataModel.model';
import { FeeDefinitionDataModel } from './FeeDefinitionDataModel.model';

export class ChainConfigDataModel
 {
  public id: number | string = "";
  public transactionReceiptId: number | string = "";
  public opAdminAddresses?: Address[] = [];
  public feeAdminAddresses?: Address[] = [];
  public nftMintNodes?: Address[] = [];
  public treasuryNodes?: Address[] = [];
  public directoryNodes?: Address[] = [];
  public notaryNodes?: Address[] = [];
  public isCurrent: boolean = false;
  public transactionReceipt: TransactionReceiptDataModel = {} as TransactionReceiptDataModel;
  public feeDefinitions?: FeeDefinitionDataModel[] = [];

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.transactionReceiptId = obj.transactionReceiptId === null? "" : obj.transactionReceiptId;
    this.opAdminAddresses = obj.opAdminAddresses?.filter((item: any) => item !== undefined)
      .map((item: any) => new Address(item)) || [];
    this.feeAdminAddresses = obj.feeAdminAddresses?.filter((item: any) => item !== undefined)
      .map((item: any) => new Address(item)) || [];
    this.nftMintNodes = obj.nftMintNodes?.filter((item: any) => item !== undefined)
      .map((item: any) => new Address(item)) || [];
    this.treasuryNodes = obj.treasuryNodes?.filter((item: any) => item !== undefined)
      .map((item: any) => new Address(item)) || [];
    this.directoryNodes = obj.directoryNodes?.filter((item: any) => item !== undefined)
      .map((item: any) => new Address(item)) || [];
    this.notaryNodes = obj.notaryNodes?.filter((item: any) => item !== undefined)
      .map((item: any) => new Address(item)) || [];
    this.isCurrent = obj.isCurrent === null? false : obj.isCurrent;
    this.transactionReceipt = !obj.transactionReceipt 
    ? new TransactionReceiptDataModel() 
    : new TransactionReceiptDataModel(obj.transactionReceipt);
    this.feeDefinitions = obj.feeDefinitions?.filter((item: any) => item !== undefined)
      .map((item: any) => new FeeDefinitionDataModel(item)) || [];
  }
}