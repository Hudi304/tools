
export class ProblemDetails
 {
  public type?: string = "";
  public title?: string = "";
  public status?: number | string = "";
  public detail?: string = "";
  public instance?: string = "";

  constructor(obj = {} as any) {
    obj = obj || {};
    this.type = obj.type === null? "" : obj.type;
    this.title = obj.title === null? "" : obj.title;
    this.status = obj.status === null? "" : obj.status;
    this.detail = obj.detail === null? "" : obj.detail;
    this.instance = obj.instance === null? "" : obj.instance;
  }
}