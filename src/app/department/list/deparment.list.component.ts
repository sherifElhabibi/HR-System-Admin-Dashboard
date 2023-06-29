import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Department } from '../../models/Department/department';
import { DepartmentService } from '../../services/department.service';
import { Employee } from 'src/app/models/Employee/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'app-list',
  templateUrl: './deparment.list.component.html',
  styleUrls: ['./deparment.list.component.scss'],
})
export class ListComponent implements OnInit {
  public E2: any;
  constructor(
    public departmentService: DepartmentService,
    public empService: EmployeeService,
    public authService:AuthService,
    public router: Router
  ) {}
  position!:string;
  depts: Department[] = [];
  emps: Employee[] = [];
  flag = false;
  idd!: number;
  targetDepartmentId!: number;
  selectedEmployeeIds: any = new Array();
  eachobject: any = new Array();
  selectsplit: any;
  currentDept: Department = new Department('', 0, [], '');
  deleteoneDept: Department = new Department('', 0, [], '');
  ngOnInit() {
    this.departmentService.getAll().subscribe((data) => {
      this.depts = data;
    });
    this.position = this.authService.getPostion();
  }
  editDept(deptedit: Department) {
    this.router.navigateByUrl(`/department/edit/${deptedit.departmentId}`);
    return (this.E2 = deptedit);
  }
  save(current: Department) {
    this.flag = true;
    this.currentDept = current;
    console.log(this.currentDept);
  }
}
