import { Signature } from './Signature.model';

export class SignatureViewModel
 {
  public signature: Signature = {} as Signature;

  constructor(obj = {} as any) {
    obj = obj || {};
    this.signature = !obj.signature 
    ? new Signature() 
    : new Signature(obj.signature);
  }
}