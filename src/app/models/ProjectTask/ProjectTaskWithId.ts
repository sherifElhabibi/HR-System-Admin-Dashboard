export class ProjectTaskWithId {
  constructor(
    public Id: number,
    public taskName: string,
    public taskDescription: string,
    public totalHoursPerTask: number,
    public projectId: number
  ) {}
}
