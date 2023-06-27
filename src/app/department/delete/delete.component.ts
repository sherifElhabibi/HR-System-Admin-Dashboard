import { Component, OnInit } from '@angular/core';

import { Department } from '../../models/Department/department';
import { Employee } from '../../models/Employee/employee';
import { DepartmentService } from '../../services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  employeeForm!: FormGroup;
  selectedEmployeeIds: FormControl = new FormControl();
  departments: Department[] = [];
  department!: Department;
  departmentId!: number;
  employees: Employee[] = [];
  selectedDeletedDepartment: number | null = null;
  selectedTargetDepartment: number | null = null;

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    public router:Router
  ) {}
  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      selectedEmployeeIds: this.selectedEmployeeIds,
    });
    this.route.params.subscribe((parameters) => {
      this.departmentId = parameters['id'];
      this.loadEmployees(this.departmentId);
      this.departmentService.getAll().subscribe((departments: Department[]) => {
        this.departments = departments.filter(
          (department) => department.departmentId !== +this.departmentId
        );
      });
    });
  }

  loadEmployees(departmentId: number): void {
    this.departmentService
      .getById(departmentId)
      .subscribe((department: Department) => {
        this.employees = department.employees;
      });
  }

  //  deleteDepartment(targetDepartmentId: number): void {
  //    const selectedEmployeeIds = this.employeeForm.get('selectedEmployeeIds')?.value;
  //    console.log(selectedEmployeeIds);
  //    this.departmentService
  //      .delete(this.departmentId, targetDepartmentId, selectedEmployeeIds)
  //      .subscribe(() => {});
  //  }

  deleteDepartment(targetDepartmentId: number | null): void {
    const selectedEmployeeIds = this.employeeForm.get('selectedEmployeeIds')?.value;
    console.log(selectedEmployeeIds);
    this.departmentService
      .delete(this.departmentId, targetDepartmentId, selectedEmployeeIds)
      .subscribe(() => {});
  }
  
  goBack(): void {
    this.router.navigate(['department/list']);
  }
}
