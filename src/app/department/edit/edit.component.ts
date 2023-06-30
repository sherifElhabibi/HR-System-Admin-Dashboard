import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Department } from 'src/app/models/Department/department';
import { Employee } from 'src/app/models/Employee/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  currentDept:Department=new Department("",0,[],"");
  dept:Department[]=[];
  employees:Employee[]=[];
  deptform!: FormGroup;
  managerId: any;
  validationMessages = {
    departmentName: {
      required: 'You must enter the name of the project',
      pattern: 'You can use combination of uppercase and lowercase letters, numbers, and spaces',
    },
  };


  constructor(public departmentService:DepartmentService,
    public employeeService:EmployeeService,
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    public activatedRoute:ActivatedRoute,public router:Router){}



  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((employeeList) => {
      this.employees = employeeList;
    });
    this.deptform = this.builder.group({
      departmentName: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9\\s]*$'),
        ])
      ),
     employessIds: this.builder.array([]),
    });
    this.activatedRoute.params.subscribe((parameters) => {
      this.departmentService
        .getById(parameters['id'])
        .subscribe((department) => {
          // Populate selected employees
          const employeesIndeptIds = this.deptform.get(
            'employessIds'
          ) as FormArray;
          department.employees?.forEach((employeeId: any) => {
            employeesIndeptIds.push(this.builder.control(employeeId));
          });
        });
    });
  }

  get employeesIndeptIds(): FormArray {
    return this.deptform.get('employessIds') as FormArray;
  }

  onEmployeeSelectionChange(event: any) {
    const selectedEmployeeIds = event.value;
    this.employeesIndeptIds.clear();
    selectedEmployeeIds.forEach((emplyeeId: string) => {
      this.employeesIndeptIds.push(this.builder.control(emplyeeId));
    });
  }
  onManagerIdChange(event: any) {
    this.managerId= event.value;
  }

  goBack(): void {
    this.router.navigate(['department/list']);
  }

  save() {
     if (this.deptform.valid) {
      this.activatedRoute.params.subscribe((parameters) => {
       if (this.deptform.valid) {
          this.departmentService
            .updateDepartment(parameters['id'], this.deptform.value,this.managerId)
           .subscribe(
             () => {
               this.snackBar.open('department edit successfully.', 'Close', {
                 duration: 3000,
               });
               this.router.navigate(['department']);
              },
              (error)=>{
                if(error.status==200){
                Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Your work has been saved',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.router.navigate(['department/list']);

             }
             else{
                  Swal.fire({
                    icon: 'warning',
                    text: 'Check your data !',
                    showConfirmButton: false,
                    timer:3000,
                  })
             }
              }
            );
       } 
       else {
        Swal.fire({
          icon: 'warning',
          text: 'Please enter valid data!',
          showConfirmButton: false,
          timer:3000,
        })
       }
      });
 
   }
   
  }



}


