export class TaskWithProjectName { 
    constructor( 
      public taskName: string, 
      public taskDescription: string, 
      public toltalHoursPerTask: number, 
      public projectName: string, 
      public taskId: number, 
    ) {} 
   
  }