export class ProjectTaskWithId {
  constructor(
    public id: number,
    public taskName: string,
    public taskDescription: string,
    public totalHoursPerTask: number,
    public projectId: number
  ) {}
}
