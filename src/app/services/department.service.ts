import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl=environment.baseApi;
  constructor(public http:HttpClient) { }
  getAllDepartments(){
    return this.http.get<Department[]>(this.baseUrl+ '/departments');
  }



  // create(dept: any): Observable<any> {
  //   //this.depart.employessIds = this.depart.employessIds.split(',').map(Number);
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.post<any>(this.baseUrl + '/departments', dept, httpOptions);
  // }

  // getManagers(){
  //   return this.http.get(this.baseUrl + '/departments');
  // }

  createDepartment(department: Department): Observable<any> {
    const url = `${this.baseUrl}/departments`;
    return this.http.post(url, department);
  }

  getManagers(): Observable<any[]> {
    const url = `${this.baseUrl}/employees`;
    return this.http.get<any[]>(url);
  }

}