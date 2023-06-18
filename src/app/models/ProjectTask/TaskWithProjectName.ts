export class TaskWithProjectName { 
    constructor( 
      public taskName: string, 
      public taskDescription: string, 
      public totalHoursPerTask: number, 
      public projectName: string, 
    ) {} 
   
  }