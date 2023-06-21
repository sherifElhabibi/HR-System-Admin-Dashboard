import { ProjectPhaseWithNoId } from "../projectPhase/ProjectPhaseWithNoId";

export class UpdateProject {
    constructor(
      public projectName: string,
      public projectTotalBudget: number,
      public projectHours: number,
      public projectStatus: number,
      public projectLocation: string,
      public projectStartDate: Date,
      public projectEndDate: Date,
      public projectDescription: string,
      public projectPhases:ProjectPhaseWithNoId[],
      public employeesInProjectIds: number[],
    ){}
  }