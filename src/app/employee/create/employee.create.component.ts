import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

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
  constructor(public empService: EmployeeService, private fb: FormBuilder, public router:Router) {}
  matcher = new MyErrorStateMatcher();
  createEmpForm = this.fb.group({
    employeeFirstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*'),
      ],
    ],
    employeeLastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*'),
      ],
    ],
    employeeSalaryPerHour: ['', [Validators.required]],
    employeeOverTime: ['', [Validators.required]],
    employeeSalary: ['', [Validators.required]],
    employeeProfileUrl: [''],
    employeePhone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
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
    employeePassword: ['', Validators.required],
    employeePosition: ['', Validators.required],
    employeeHiringDate: ['', Validators.required],
  });

  getFname() {
    return this.createEmpForm.get('employeeFirstName');
  }

  getLname() {
    return this.createEmpForm.get('employeeLastName');
  }

  getSalaryPerHour() {
    return this.createEmpForm.get('employeeSalaryPerHour');
  }

  getOverTime() {
    return this.createEmpForm.get('employeeOverTime');
  }

  getSalary() {
    return this.createEmpForm.get('employeeSalary');
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

  display() {
    return console.log(this.createEmpForm);
  }

  createNewEmp(): void {
    this.empService.createEmployee(this.createEmpForm.value).subscribe(
      (response) => {this.router.navigateByUrl('/employees/list'); console.log(response)},
      (error) => console.log(error)
    );
  }
}
