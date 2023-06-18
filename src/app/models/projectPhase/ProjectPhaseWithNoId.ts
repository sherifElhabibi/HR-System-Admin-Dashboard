export class ProjectPhaseWithNoId {
    constructor(
        public phaseName: number,
        public phaseStartDate: Date,
        public phaseEndDate: Date,
        public phaseMilestone: string,
        public phaseHrBudget: number,
    ){}
  }
