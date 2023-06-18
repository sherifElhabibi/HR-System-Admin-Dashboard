import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Projectphases } from '../models/projectPhase/Projectphases ';


@Injectable({
  providedIn: 'root'
})
export class ProjectphasesService {
  private baseUrl = environment.baseApi;
  constructor(public HttpClient:HttpClient) { }
  getIdProjectsPhases(id:number){
    return this.HttpClient.get<Projectphases>(this.baseUrl + '/projectphases/'+id);
   }
}
