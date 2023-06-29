import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-create',
  templateUrl: './employee.create.component.html',
  styleUrls: ['./employee.create.component.scss']
})

export class EmployeeCreateComponent {
  constructor(
    public empService: EmployeeService,
    private fb: FormBuilder,
    public router: Router,
    private datePipe: DatePipe
  ) { }
  matcher = new MyErrorStateMatcher();
  createEmpForm = this.fb.group({
    employeeFirstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z\\s]*$'),
      ],
    ],
    employeeLastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z\\s]*$'),
      ],
    ],
    employeeSalaryPerHour: [0,
      [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]
    ],
    employeeOvertimeRate: [0,
      [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]
    ],
    employeeRegularHoursPerDay: [0,
      [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]
    ],
    employeeWorkingDaysPerWeek: [0,
      [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]
    ],
    employeeProfileUrl: ['',
      [
        Validators.pattern('\.(jpg|png|jpeg)$')
      ]
    ],
    employeePhone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ],
    ],
    employeeEmail: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
        ),
      ],
    ],
    employeePassword: ['',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&\\s])[A-Za-z\\d@$!%*#?&\\s]{8,}$')
      ]
    ],
    employeePosition: [0, Validators.required],
    employeeHiringDate: ['', Validators.required],
    employeeStatus: [0, Validators.required]
  });

  /* ------------------------ */
  getEmployeeOvertimeRate() {
    return this.createEmpForm.get('employeeOvertimeRate');
  }
  getEmployeeRegularHoursPerDay() {
    return this.createEmpForm.get('employeeRegularHoursPerDay');
  }
  getEmployeeWorkingDaysPerWeek() {
    return this.createEmpForm.get('employeeWorkingDaysPerWeek');
  }
  /* ------------------------ */
  getFname() {
    return this.createEmpForm.get('employeeFirstName');
  }
  getLname() {
    return this.createEmpForm.get('employeeLastName');
  }
  getEmployeeStatus() {
    return this.createEmpForm.get('employeeStatus');
  }

  getSalaryPerHour() {
    return this.createEmpForm.get('employeeSalaryPerHour');
  }

  getProfileUrl() {
    return this.createEmpForm.get('employeeProfileUrl');
  }

  getPhone() {
    return this.createEmpForm.get('employeePhone');
  }

  getEmail() {
    return this.createEmpForm.get('employeeEmail');
  }

  getPosition() {
    return this.createEmpForm.get('employeePosition');
  }

  getPassword() {
    return this.createEmpForm.get('employeePassword');
  }

  getHiringDate() {
    return this.createEmpForm.get('employeeHiringDate');
  }



  createNewEmp(): void {
    this.createEmpForm.value.employeeHiringDate = this.datePipe.transform(
      this.createEmpForm.value.employeeHiringDate,
      'yyyy-MM-dd'
    );

    if (this.createEmpForm) {
      const employeePosition = this.createEmpForm.get('employeePosition');
      if (employeePosition) {
        const EmployeePosition = employeePosition.value;
        if (typeof EmployeePosition === 'string') {
          const parsedValue = parseFloat(EmployeePosition);
          if (!isNaN(parsedValue)) {
            employeePosition.setValue(parsedValue);
          }
        }
      }
    }

    if (this.createEmpForm) {
      const employeeStatus = this.createEmpForm.get('employeeStatus');
      if (employeeStatus) {
        const EmployeeStatus = employeeStatus.value;
        if (typeof EmployeeStatus === 'string') {
          const parsedValue = parseFloat(EmployeeStatus);
          if (!isNaN(parsedValue)) {
            employeeStatus.setValue(parsedValue);
          }
        }
      }
    }
    
    this.empService.createEmployee(this.createEmpForm.value).subscribe(
      (response) => { this.router.navigateByUrl('/employees/list');
      if(response.status==200){
        Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })

            }

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
              // this.snackBar.open('dept added successfully.', 'Close', {
              //   duration: 3000,
              // });
       }
       else{
        Swal.fire({
          icon: 'error',
          title: 'Please enter valid data',
          showConfirmButton: false,
          timer: 1500
        })
       }
      }
    );
  }
  /* ------------- */
  goBack(): void {
    this.router.navigate(['employees/list']);
  }
  /* ------------- */
}
