export class GetProjectTasksByProjectId {
    constructor(
       public id: number,
       public taskName: string,
       public taskDescription: string,
       public totalHoursPerTask: number,
    ){}
  }