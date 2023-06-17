export class Department{
  constructor(
    public departmentName:string,
    public managerId:number |undefined,
    public employessIds:any,
    public mangerName?:string,
    public employees?:any ,
    public noEmployees?:number,
    public departmentId?:number,
   ){}
  }