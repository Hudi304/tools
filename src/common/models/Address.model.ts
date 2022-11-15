
export class Address
 {
  public bytes?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.bytes = obj.bytes === null? "" : obj.bytes;
  }
}