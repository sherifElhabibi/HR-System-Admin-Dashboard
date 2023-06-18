import { GetAttendancesInProject } from '../Attendance/GetAttendancesInProject';
import { EmployeeDeptDetails } from '../Employee/EmployeeDeptDetails';
import { ProjectTask } from '../ProjectTask/projectTask';
import { ProjectPhaseWithId } from '../projectPhase/ProjectPhaseWithId';

export class GetAllProjects {
  constructor(
    public projectId: number,
    public projectName: string,
    public projectTotalBudget: number,
    public projectHours: number,
    public projectStatus: string,
    public projectLocation: string,
    public projectStartDate: string,
    public projectEndDate: string,
    public projectDescription: string,
    public projectTasks: ProjectTask[],
    public employeesInProject: EmployeeDeptDetails[],
    public projectPhases: ProjectPhaseWithId[],
    public projectAttendances: GetAttendancesInProject[]
  ) {}
}
