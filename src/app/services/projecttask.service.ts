import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { ProjectTask  } from '../../app/models/ProjectTask/projectTask';
import { CreateProjectTask  } from '../../app/models/ProjectTask/CreateProjectTask';//dto for create


@Injectable({
  providedIn: 'root'
})
export class ProjecttaskService {
  private baseUrl = environment.baseApi;
  constructor(public HttpClient:HttpClient) { }
  createProjectTask(projectTask: any){
    return this.HttpClient.post<CreateProjectTask>(this.baseUrl + '/ProjectTask',projectTask);
   }
   deleteProjectTaskById(id:number){
    return this.HttpClient.delete<CreateProjectTask>(this.baseUrl+'/ProjectTask'+'/'+id);
  }
   editProjectTask(id:number,projectTask: any){
    return this.HttpClient.put<ProjectTask>(this.baseUrl +'/ProjectTask'+'/'+id,projectTask);
   }
   getProjectTaskById(id:number){
    return this.HttpClient.get<ProjectTask>(this.baseUrl+'/ProjectTask'+'/'+id);
  }
}
