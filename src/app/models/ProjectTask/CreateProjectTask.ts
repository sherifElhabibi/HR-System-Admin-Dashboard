export class CreateProjectTask { 
    constructor( 
      public taskName: string, 
      public taskDescription: string, 
      public totalHoursPerTask: number, 
      public projectId: number, 
    ){} 
  }