import { GetProjectTasksForProject } from "../ProjectTask/GetProjectTasksForProject";
import { GetProjectPhasesForProject } from "../projectPhase/GetProjectPhasesForProject";

export class GetEmployeeProjects {
    constructor(
    public projectId: number,
    public projectName: string,
    public projectPhases: GetProjectPhasesForProject[],
    public projectTaskes: GetProjectTasksForProject[],
    ){}
  }