import { Address } from './Address.model';
import { AccountType } from '@/common/enums/AccountType.enum';
import { uint256 } from './uint256.model';
import { TransactionReceiptDataModel } from './TransactionReceiptDataModel.model';
import { AccountProgramDataModel } from './AccountProgramDataModel.model';
import { AccountStateDataModel } from './AccountStateDataModel.model';

export class AccountDataModel
 {
  public id: number | string = "";
  public createdInTransactionId: number | string = "";
  public address: Address = {} as Address;
  public timestamp: number | string = "";
  public type: AccountType = {} as AccountType;
  public codeHash: uint256 = {} as uint256;
  public createdInTransaction: TransactionReceiptDataModel = {} as TransactionReceiptDataModel;
  public program: AccountProgramDataModel = {} as AccountProgramDataModel;
  public accountStates?: AccountStateDataModel[] = [];

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.createdInTransactionId = obj.createdInTransactionId === null? "" : obj.createdInTransactionId;
    this.address = !obj.address 
    ? new Address() 
    : new Address(obj.address);
    this.timestamp = obj.timestamp === null? "" : obj.timestamp;
    this.type = obj.type === null? {} as AccountType : obj.type;
    this.codeHash = obj.codeHash === null? {} as uint256 : obj.codeHash;
    this.createdInTransaction = !obj.createdInTransaction 
    ? new TransactionReceiptDataModel() 
    : new TransactionReceiptDataModel(obj.createdInTransaction);
    this.program = !obj.program 
    ? new AccountProgramDataModel() 
    : new AccountProgramDataModel(obj.program);
    this.accountStates = obj.accountStates?.filter((item: any) => item !== undefined)
      .map((item: any) => new AccountStateDataModel(item)) || [];
  }
}