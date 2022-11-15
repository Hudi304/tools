import { OperationType } from '@/common/enums/OperationType.enum';
import { Address } from './Address.model';

export class ExplorerStateOperationDataModel
 {
  public transactionReceiptId: number | string = "";
  public transactionNo: number | string = "";
  public order: number | string = "";
  public type: OperationType = {} as OperationType;
  public contextAccount: Address = {} as Address;
  public targetAccount: Address = {} as Address;
  public isFailed: boolean = false;
  public data?: string = "";
  public dataPayload?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
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
    this.isFailed = obj.isFailed === null? false : obj.isFailed;
    this.data = obj.data === null? "" : obj.data;
    this.dataPayload = obj.dataPayload === null? "" : obj.dataPayload;
  }
}