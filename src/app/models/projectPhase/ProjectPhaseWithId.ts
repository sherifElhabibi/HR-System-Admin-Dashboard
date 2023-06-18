export class ProjectPhaseWithId {
    constructor(
        public Id:number,
        public phaseName: number,
        public phaseStartDate: Date,
        public phaseEndDate: Date,
        public phaseMilestone: string,
        public phaseHrBudget: number,
    ){}
  }