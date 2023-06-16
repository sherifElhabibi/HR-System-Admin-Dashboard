export class Department{
    constructor(
     public name:string,
     public managerId:number |undefined,
     public employessIds:number[],
     public noEmployees?:number,
     public managerName?:string,
     public departmentName?:string,
     public id?:number,
    ){}
  }