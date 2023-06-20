import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Projectphases } from '../models/projectPhase/Projectphases ';
import { Observable } from 'rxjs';
import { ProjectPhaseById } from '../models/projectPhase/ProjectPhaseById';
import { UpdateProjectPhase  } from '../models/projectPhase/UpdateProjectPhase';
import { CreateProjectPhase  } from '../models/projectPhase/CreateProjectPhase';
@Injectable({
  providedIn: 'root'
})

export class ProjectphasesService {
  private baseUrl = environment.baseApi;
  constructor(public HttpClient:HttpClient){ }
  getPhaseById(id:number):Observable<any> {
    return this.HttpClient.get<ProjectPhaseById>(this.baseUrl + '/projectphases'+'/'+id);
   }
  postPhaseInProject(id:number,projectPhase:Projectphases):Observable<any> {
    return this.HttpClient.post<Projectphases>(this.baseUrl + '/projectphases'+'/'+id,projectPhase);
   }
  editPhase(id:number,projectPhase:any):Observable<any> {
   return this.HttpClient.put<UpdateProjectPhase>(this.baseUrl + '/projectphases'+'/'+id,projectPhase);
  }
  deletePhase(id:number){
   return this.HttpClient.delete<Projectphases>(this.baseUrl + '/projectphases' + '/' + id);
  }

  createProjectPhase(idparam:number,projectPhase: any,){
    return this.HttpClient.post<Projectphases>(this.baseUrl + '/projectphases'+'/'+idparam,projectPhase);
   }

}
