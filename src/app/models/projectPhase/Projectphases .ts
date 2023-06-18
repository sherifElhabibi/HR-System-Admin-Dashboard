export class Projectphases {
    constructor(
     public  phaseName: number,
     public  phaseStartDate: Date,
     public  phaseEndDate: Date,
     public  phaseHrBudget: number,
     public  ProjectId: number,  
     public  Id?: number,
     public  milestone?: string,
    ){}
}