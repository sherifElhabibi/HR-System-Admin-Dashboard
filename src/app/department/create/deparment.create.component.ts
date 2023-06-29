import { Component } from '@angular/core';

import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Department } from '../../models/Department/department';
import { Employee } from 'src/app/models/Employee/employee';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './deparment.create.component.html',
  styleUrls: ['./deparment.create.component.scss'],
})
export class CreateComponent {
  depts!: Department[];
  emps!: Employee[];
  flag: number = 0;
  flagArray = [0, 1];
  validationMessages = {
    departmentName: {
      required: 'You must enter the name of the department',
      pattern: 'You can use combination of uppercase and lowercase letters, numbers, and spaces',
    },
    managerId: {
      required: 'You must enter the managerId',
      pattern: 'should only contain numbers',
    },
  };
  constructor(
    private builder: FormBuilder,
    private deptService: DepartmentService,
    public fb: FormBuilder,
    private empService: EmployeeService,
    public router: Router
  ) { }
  ngOnInit() {
    this.empService.getAllEmployees().subscribe((emps: any) => {
      this.emps = emps;
      
    });
    this.deptService.getAll().subscribe((depts: any) => {
      this.depts = depts;
      
    });
  }

  createDeptForm = this.builder.group({
    departmentName: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9\\s]*$'),
      ])
    ),
    managerId: this.builder.control(
      0,
      Validators.compose([Validators.required])
    ),
    employessIds: this.builder.array([]),
  });

  get employeesInProjectIds(): FormArray {
    return this.createDeptForm.get('employessIds') as FormArray;
  }

  onEmployeeSelectionChange(event: any) {
    const selectedEmployeeIds = event.value;
    this.employeesInProjectIds.clear();
    selectedEmployeeIds.forEach((emplyeeId: string) => {
      this.employeesInProjectIds.push(this.builder.control(emplyeeId));
    });
  }

  onflagChange(event: any) {
    this.flag = event.value;
  }

  goBack(): void {
    this.router.navigate(['department/list']);
  }

  createNewDept() {
    if (this.createDeptForm.valid) {
      this.deptService
        .createDepartment(this.createDeptForm.value, this.flag)
        .subscribe(
          (response) => {
            this.router.navigate(['project']);
          },
          (error) => {
            if(error.status==200){
              Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })

           }
           else{
                Swal.fire({
                  icon: 'error',
                  title: 'Something went wrong!',
                  showConfirmButton: false,
                  timer: 1500
                })
           }

          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please enter valid data',
        showConfirmButton: false,
        timer: 1500
      })

    }
  }
  showDiv() {
    const divElement = document.getElementById('more');

    if (divElement?.style.display == 'none') {
      divElement.style.display = '';
    }
    else if (divElement?.style.display == '') {
      divElement.style.display = 'none';

    }
  }
}
