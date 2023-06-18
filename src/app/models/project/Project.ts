import { Projectphases } from "../projectPhase/Projectphases ";
export class Project {
    constructor(
    public projectName:string,
    public projectTotalBudget:number,
    public hoursBudget:number,
    public projectStatus:number,
    public projectLocation:string,
    public projectStartDate:Date,
    public projectEndDate:Date,
    public projectDescription:string,
    public employeesInProjectIds:[],
    public projectPhases:Projectphases[],
    public projectId:number ,
    public projectHours?:number,
    public projectAttendances?:string,
    public projectTasksIds?:string,
){}
}