export class GetAttendancesInProject { 
    constructor( 
      public employeeId: number, 
      public employeeName: string, 
      public projectName: string, 
      public phaseName: string, 
      public taskName: string, 
      public date: string, 
      public description: string, 
      public hoursSpent: number, 
    ){} 
  }