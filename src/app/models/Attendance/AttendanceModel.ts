export class AttendanceModel {
    constructor(
      public employeeId: number,
      public projectId: number,
      public projectPhaseId: number,
      public projectTaskId: number,
      public date: Date,
      public description: string,
      public hoursSpent: number
    ) {}
  }