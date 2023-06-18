export class UpdateProjectPhase { 
  constructor( 
    public Id:number,
    public phaseName: 0|1|2|3|4|5|6, 
    public phaseStartDate: Date, 
    public phaseEndDate: Date, 
    public phaseMilestone: string, 
    public phaseHrBudget: number, 
  ) {} 
 
}