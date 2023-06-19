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
  createEmployee(projectTask: any){
    return this.HttpClient.post<ProjectTask>(this.baseUrl + '/ProjectTask',projectTask);
   }
   editEmployee(id:number,projectTask: any){
    return this.HttpClient.put<ProjectTask>(this.baseUrl + '/ProjectTask'+'/'+id,projectTask);
   }
   getEmployeeById(id:number){
    return this.HttpClient.get<ProjectTask>(this.baseUrl+'/ProjectTask'+'/'+id);
  }
}
