export class UpdateProject {
    constructor(
      public projectName: string,
      public projectTotalBudget: number,
      public projectHours: number,
      public projectStatus: 0|1|2,
      public projectLocation: string,
      public projectStartDate: Date,
      public projectEndDate: Date,
      public projectDescription: string,
    ){}
  }