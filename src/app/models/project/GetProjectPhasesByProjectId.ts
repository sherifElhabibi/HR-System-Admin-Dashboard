export class GetProjectPhasesByProjectId { 
    constructor( 
      public id: number, 
      public phaseName: string, 
      public phaseStartDate: Date, 
      public phaseEndDate: Date, 
      public phaseMilestone: string, 
      public phaseHrBudget: number
    ){} 
  }