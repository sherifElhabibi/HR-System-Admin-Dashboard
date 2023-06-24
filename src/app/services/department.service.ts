import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/Department/department';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl=environment.baseApi;
  constructor(public http:HttpClient) { }
  // createDepartment(department: Department,check:any): Observable<any> {
  //   const url = `${this.baseUrl}/departments/${check}`;
  //   return this.http.post(url, department,check);
  // }
  createDepartment(department: any,check:any):Observable<any>{
    const url = `${this.baseUrl}/departments/${check}`;
    return this.http.post<Department>(url,department,check);
   }
   updateDepartment(id: number, UpdateDept: any,managerId:any): Observable<any> {
    UpdateDept.managerId=managerId
   return this.http.put<Department>(this.baseUrl+'/departments/'+id, UpdateDept);
 }
  getAll(){
    return this.http.get<Department[]>(this.baseUrl+ '/departments');
  }


  deleteById(id: number, targetDepartmentId: number, selectedEmployeeIds?:any) {
    let url = this.baseUrl + '/departments/delete/' + id + '/target/' + targetDepartmentId;
    //let options : any;
    // if (selectedEmployeeIds) {
    //   options = { body: { selectedEmployeeIds } };
    // }
    return this.http.delete(url,selectedEmployeeIds);
  }

  getById(id:number){ return this.http.get<Department>(this.baseUrl+ '/departments/'+id);}


  edit(dept:Department){
    return this.http.patch(this.baseUrl+ '/departments/'+dept.departmentId,dept);
   }


  getManagers(): Observable<any[]> {
    const url = this.baseUrl+ '/employees';
    return this.http.get<any[]>(url);
  }

}