
export class Uint256
 {
  public size: number | string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.size = obj.size === null? "" : obj.size;
  }
}