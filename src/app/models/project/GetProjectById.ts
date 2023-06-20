import { EmployeeDeptDetails } from '../Employee/EmployeeDeptDetails';
import { ProjectTaskWithId } from '../ProjectTask/ProjectTaskWithId';
import { ProjectPhaseById } from '../projectPhase/ProjectPhaseById';
import { GetAttendancesInProject } from '../Attendance/GetAttendancesInProject';
export class GetProjectById {
  constructor(
    public projectName: string,
    public projectTotalBudget: number,
    public projectHours: number,
    public projectStatus: string,
    public projectLocation: string,
    public projectStartDate: Date,
    public projectEndDate: Date,
    public projectDescription: string,
    public projectTasks: ProjectTaskWithId[],
    public employeesInProject: EmployeeDeptDetails[],
    public projectPhases: ProjectPhaseById[],
    public projectAttendances: GetAttendancesInProject[],
    public projectId?: any,
    

  ) {}
}
