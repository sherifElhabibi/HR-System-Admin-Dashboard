import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Employee } from '../models/Employee/employee';
import { GetEmployeeById } from '../models/Employee/EmployeeGetId';
import { Observable } from 'rxjs';
import {GetEmployeeProjects} from '../models/Employee/GetEmployeeProjects'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.baseApi;
  constructor(public HttpClient:HttpClient) { }
  getAllEmployees():Observable<any> {
    return this.HttpClient.get<Employee>(this.baseUrl + '/employees');
    }
   createEmployee(employee: any):Observable<any> {
    return this.HttpClient.post<Employee>(this.baseUrl + '/employees',employee);
   }
   editEmployee(id:number,employee: any):Observable<any> {
    return this.HttpClient.put<Employee>(this.baseUrl + '/employees'+'/'+id,employee);
   }
   getEmployeeById(id:any):Observable<any> {
    return this.HttpClient.get<GetEmployeeById>(this.baseUrl+'/employees'+'/'+id);
  }
  deleteEmployeeById(id:number):Observable<any> {
    return this.HttpClient.delete<Employee>(this.baseUrl+'/employees'+'/'+id);
  }
  GetEmployeesHoursAndTotoalCostInAllProjects():Observable<any> {
   return this.HttpClient.get(this.baseUrl + '/employees'+'/'+'GetEmployeesHoursAndTotoalCostInAllProjects')
  }
  getEmployeesCostsInProject(projectId:number){
    return this.HttpClient.get<any>(this.baseUrl+'/employees'+'/'+'GetEmployeesCostsInProject'+'/'+projectId);
  }
  getEmployeeSalary(employeeId: number,start:any,end:any):Observable<any>{
    return this.HttpClient.get<any>(this.baseUrl+'/employees/GetEmployeeSalaryAndOverTime/'+employeeId+'/StartDate/'+start+'/EndDate/'+end);
  }

  getEmployeeProjects(employeeId: number): Observable<any> {
    return this.HttpClient.get<GetEmployeeProjects>(this.baseUrl + '/employees/GetEmployeeProjects/' + employeeId);
  }
  
}
