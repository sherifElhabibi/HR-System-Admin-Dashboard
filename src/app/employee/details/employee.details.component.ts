import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Department } from 'src/app/models/Department/department';
import { Employee } from 'src/app/models/Employee/employee';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee.details',
  templateUrl: './employee.details.component.html',
  styleUrls: ['./emplyoee.details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  depts: Department[] = [];
  filteredEmp = new Employee(
    0,
    '',
    '',
    0,
    0,
    0,
    0,
    '',
    '',
    '',
    '',
    '',
    0,
    0,
    0,
    undefined,
    undefined
  );
  HoursAndTotoalCostInAllProjects!: any;
  id!: number;
  employee: Employee = new Employee(
    0,
    '',
    '',
    0,
    0,
    0,
    0,
    '',
    '',
    '',
    '',
    '',
    0,
    0,
    0,
    undefined,
    undefined
  );

  constructor(
    public empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  position!:string;
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = +params['emplyeeId'];
    });
    this.empService
      .getEmployeeById(this.id)
      .subscribe((currentEmployee: any) => {
        this.employee = currentEmployee;
      });
    this.position = this.authService.getPostion();
    this.empService
      .GetEmployeesHoursAndTotoalCostInAllProjects()
      .subscribe((data) => {
        this.HoursAndTotoalCostInAllProjects = data;
        this.HoursAndTotoalCostInAllProjects.forEach((element: any) => {

          if (element.employeeId == this.id) {
            this.filteredEmp = element;
          } 
          
        });
      });
  }
  goBack(): void {
    this.router.navigate(['employees/list']);
  }
  CalcSalary(){
    this.router.navigate(['employees/salary/'+this.id]);
  }
}
