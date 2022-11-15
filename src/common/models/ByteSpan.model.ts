
export class ByteSpan
 {
  public length: number | string = "";
  public isEmpty: boolean = false;

  constructor(obj = {} as any) {
    obj = obj || {};
    this.length = obj.length === null? "" : obj.length;
    this.isEmpty = obj.isEmpty === null? false : obj.isEmpty;
  }
}