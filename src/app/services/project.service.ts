import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

import { GetAllProjects} from '../models/project/GetAllProjects';
import { CreateProject} from '../models/project/CreateProject';
import { GetProjectHoursAndTotalCost} from '../models/project/GetProjectHoursAndTotalCost';
import { GetProjectPhasesByProjectId} from '../models/project/GetProjectPhasesByProjectId';
import { GetProjectsHoursAndTotalCosts} from '../models/project/GetProjectsHoursAndTotalCosts';
import { GetProjectTasksByProjectId} from '../models/project/GetProjectTasksByProjectId';
import { UpdateProject} from '../models/project/UpdateProject';

import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = environment.baseApi+"/Projects";
  constructor(public http: HttpClient) {}

  getAllProjects(): Observable<any> {
    return this.http.get<GetAllProjects[]>(this.baseUrl);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl+"/"+id);
  }

  createProject(CreateProject: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, CreateProject);
  }

  updateProject(id: number, UpdateProject: any): Observable<any> {
    return this.http.put<UpdateProject>(this.baseUrl+"/"+id, UpdateProject);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl+"/"+id);
  }

  getProjectTasksByProjectId(projectId: number): Observable<any> {
    return this.http.get<GetProjectTasksByProjectId[]>(`${this.baseUrl}/GetProjectTasks/${projectId}`);
  }

  getProjectPhasesByProjectId(projectId: number): Observable<any> {
    return this.http.get<GetProjectPhasesByProjectId[]>(`${this.baseUrl}/GetProjectPhases/${projectId}`);
  }

  projectExists(projectId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/ProjectExists/${projectId}`);
  }

  getProjectHoursAndTotalCost(projectId: number): Observable<any> {
    return this.http.get<GetProjectHoursAndTotalCost>(`${this.baseUrl}/GetProjectHoursAndTotalCost/${projectId}`);
  }

  getProjectsHoursAndTotalCosts(): Observable<any> {
    return this.http.get<GetProjectsHoursAndTotalCosts>(`${this.baseUrl}/GetProjectsHoursAndTotalCosts`);
  }
}
