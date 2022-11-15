import { OperationType } from '@/common/enums/OperationType.enum';
import { Address } from './Address.model';
import { OperationData } from './OperationData.model';
import { TransactionReceiptDataModel } from './TransactionReceiptDataModel.model';

export class StateOperationDataModel
 {
  public id: number | string = "";
  public transactionReceiptId: number | string = "";
  public transactionNo: number | string = "";
  public order: number | string = "";
  public type: OperationType = {} as OperationType;
  public contextAccount: Address = {} as Address;
  public targetAccount: Address = {} as Address;
  public isSystemLevel: boolean = false;
  public data: OperationData = {} as OperationData;
  public dataPayload?: string = "";
  public transactionReceipt: TransactionReceiptDataModel = {} as TransactionReceiptDataModel;

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.transactionReceiptId = obj.transactionReceiptId === null? "" : obj.transactionReceiptId;
    this.transactionNo = obj.transactionNo === null? "" : obj.transactionNo;
    this.order = obj.order === null? "" : obj.order;
    this.type = obj.type === null? {} as OperationType : obj.type;
    this.contextAccount = !obj.contextAccount 
    ? new Address() 
    : new Address(obj.contextAccount);
    this.targetAccount = !obj.targetAccount 
    ? new Address() 
    : new Address(obj.targetAccount);
    this.isSystemLevel = obj.isSystemLevel === null? false : obj.isSystemLevel;
    this.data = !obj.data 
    ? new OperationData() 
    : new OperationData(obj.data);
    this.dataPayload = obj.dataPayload === null? "" : obj.dataPayload;
    this.transactionReceipt = !obj.transactionReceipt 
    ? new TransactionReceiptDataModel() 
    : new TransactionReceiptDataModel(obj.transactionReceipt);
  }
}