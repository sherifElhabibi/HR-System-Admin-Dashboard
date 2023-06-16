import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Project } from '../models/project';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = environment.baseApi;
  constructor(public HttpClient:HttpClient) { }
  getAllProjects(){
    return this.HttpClient.get<Project>(this.baseUrl + '/Projects');
   }
   createProject(Project: any){
    return this.HttpClient.post<Project>(this.baseUrl + '/Projects',Project);
   }
   getProjectPhases(projectId:number){
    return this.HttpClient.get<any>(`${this.baseUrl}/GetProjectPhases/${projectId}`)
  }
  //  getPhasesForProject(projectId: number): Observable<any[]> {
  //   const url = `https://localhost:7029/api/projectphases/${projectId}`;
  //   return this.HttpClient.get<any[]>(url);
  // }


  // getAllProjectsPhases(){
  //   return this.HttpClient.get<any>(this.baseUrl + '/projectphases');
  //  }

}
