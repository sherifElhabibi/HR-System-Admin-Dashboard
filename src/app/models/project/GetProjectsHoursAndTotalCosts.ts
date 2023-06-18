export class GetProjectsHoursAndTotalCosts { 
    constructor( 
      public projectId: number, 
      public projectName: string, 
      public totalHoursSpent: number, 
      public totalCost: number, 
    ){}
  }