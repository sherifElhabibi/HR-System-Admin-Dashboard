import { Component,OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee.list.component.html',
  styleUrls: ['./employee.list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  constructor(private empServ: EmployeeService) {
  }
  displayedColumns: string[] = ['employeeFirstName', 'employeeLastName', 'employeeSalary', 'employeeProfileUrl', 'employeePhone', 'employeeEmail', 'employeePosition', 'employeeHiringDate', 'departmentId', 'actions'];
  employees: Employee[]=[];
  ngOnInit(): void {
    this.empServ.getAllEmployees().subscribe(
      (response:any) => {
        this.employees = response;
        console.log(this.employees);
      },
      error => {
        console.log(error);
      }
    );
  }
}
