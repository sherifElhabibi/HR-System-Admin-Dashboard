import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Employee } from '../models/Employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.baseApi;
  constructor(public HttpClient:HttpClient) { }
  getAllEmployees(){
    return this.HttpClient.get<Employee>(this.baseUrl + '/employees');
   }
   createEmployee(employee: any){
    return this.HttpClient.post<Employee>(this.baseUrl + '/employees',employee);
   }
   editEmployee(id:number,employee: any){
    return this.HttpClient.put<Employee>(this.baseUrl + '/employees'+'/'+id,employee);
   }
   getEmployeeById(id:number){
    return this.HttpClient.get<Employee>(this.baseUrl+'/employees'+'/'+id);
  }
}
