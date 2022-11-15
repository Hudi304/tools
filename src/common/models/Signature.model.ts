import { ByteSpan } from './ByteSpan.model';

export class Signature
 {
  public bytes?: string = "";
  public v: number | string = "";
  public chainId?: number | string = "";
  public recoveryId: number | string = "";
  public r?: string = "";
  public rAsSpan: ByteSpan = {} as ByteSpan;
  public s?: string = "";
  public sAsSpan: ByteSpan = {} as ByteSpan;
  public bytesWithRecovery?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.bytes = obj.bytes === null? "" : obj.bytes;
    this.v = obj.v === null? "" : obj.v;
    this.chainId = obj.chainId === null? "" : obj.chainId;
    this.recoveryId = obj.recoveryId === null? "" : obj.recoveryId;
    this.r = obj.r === null? "" : obj.r;
    this.rAsSpan = !obj.rAsSpan 
    ? new ByteSpan() 
    : new ByteSpan(obj.rAsSpan);
    this.s = obj.s === null? "" : obj.s;
    this.sAsSpan = !obj.sAsSpan 
    ? new ByteSpan() 
    : new ByteSpan(obj.sAsSpan);
    this.bytesWithRecovery = obj.bytesWithRecovery === null? "" : obj.bytesWithRecovery;
  }
}