import { Address } from './Address.model';
import { OperationType } from '@/common/enums/OperationType.enum';
import { ChainConfigDataModel } from './ChainConfigDataModel.model';

export class FeeDefinitionDataModel
 {
  public id: number | string = "";
  public chainConfigId: number | string = "";
  public feeAccount: Address = {} as Address;
  public coinKey?: string = "";
  public flatFee?: number | string = "";
  public percentFee?: number | string = "";
  public ceil?: number | string = "";
  public floor?: number | string = "";
  public type: OperationType = {} as OperationType;
  public chainConfig: ChainConfigDataModel = {} as ChainConfigDataModel;

  constructor(obj = {} as any) {
    obj = obj || {};
    this.id = obj.id === null? "" : obj.id;
    this.chainConfigId = obj.chainConfigId === null? "" : obj.chainConfigId;
    this.feeAccount = !obj.feeAccount 
    ? new Address() 
    : new Address(obj.feeAccount);
    this.coinKey = obj.coinKey === null? "" : obj.coinKey;
    this.flatFee = obj.flatFee === null? "" : obj.flatFee;
    this.percentFee = obj.percentFee === null? "" : obj.percentFee;
    this.ceil = obj.ceil === null? "" : obj.ceil;
    this.floor = obj.floor === null? "" : obj.floor;
    this.type = obj.type === null? {} as OperationType : obj.type;
    this.chainConfig = !obj.chainConfig 
    ? new ChainConfigDataModel() 
    : new ChainConfigDataModel(obj.chainConfig);
  }
}