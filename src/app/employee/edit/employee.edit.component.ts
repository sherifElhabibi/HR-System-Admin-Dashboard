import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/Department/department';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

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
  selector: 'app-edit',
  templateUrl: './employee.edit.component.html',
  styleUrls: ['./employee.edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {
  depts: Department[] = [];
  id!: number;
  constructor(
    public empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = +params['emplyeeId'];
    });
    this.empService.getEmployeeById(this.id).subscribe((employee: any) => {
      this.editEmpForm.patchValue(employee);
    });
  }

  matcher = new MyErrorStateMatcher();
  editEmpForm = this.fb.group({
    employeeFirstName: [
      '',
      [
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]*$'),
      ],
    ],
    employeeLastName: [
      '',
      [
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z\\s]*$'),
      ],
    ],
    employeeSalaryPerHour: [0,
      [
        Validators.pattern('^[0-9]+$')
      ]
    ],
    employeeOvertimeRate: [0,
      [
        Validators.pattern('^[0-9]+$')
      ]
    ],
    employeeRegularHoursPerDay: [0,
      [
        Validators.pattern('^[0-9]+$')
      ]
    ],
    employeeWorkingDaysPerWeek: [0,
      [
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
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ],
    ],
    employeeEmail: [
      '',
      [
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
        ),
      ],
    ],
    employeePassword: ['',
      [
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&\\s])[A-Za-z\\d@$!%*#?&\\s]{8,}$')
      ]
    ],
    employeePosition: [0],
    employeeHiringDate: [''],
    employeeStatus: [0]
  });

  getFname() {
    return this.editEmpForm.get('employeeFirstName');
  }

  getLname() {
    return this.editEmpForm.get('employeeLastName');
  }
  getEmployeeOvertimeRate() {
    return this.editEmpForm.get('employeeOvertimeRate');
  }
  getEmployeeRegularHoursPerDay() {
    return this.editEmpForm.get('employeeRegularHoursPerDay');
  }

  getEmployeeWorkingDaysPerWeek() {
    return this.editEmpForm.get('employeeWorkingDaysPerWeek');
  }

  getSalaryPerHour() {
    return this.editEmpForm.get('employeeSalaryPerHour');
  }

  getProfileUrl() {
    return this.editEmpForm.get('employeeProfileUrl');
  }

  getPhone() {
    return this.editEmpForm.get('employeePhone');
  }

  getEmail() {
    return this.editEmpForm.get('employeeEmail');
  }

  getPosition() {
    return this.editEmpForm.get('employeePosition');
  }

  getPassword() {
    return this.editEmpForm.get('employeePassword');
  }

  getStatus() {
    return this.editEmpForm.get('employeeStatus');
  }
  getHiringDate() {
    return this.editEmpForm.get('employeeHiringDate');
  }

  display() {
    return console.log(this.editEmpForm);
  }

  editEmp() {
    
    this.editEmpForm.value.employeeHiringDate = this.datePipe.transform(
      this.editEmpForm.value.employeeHiringDate,
      'yyyy-MM-dd'
    );
    if (this.editEmpForm) {
      const employeePosition = this.editEmpForm.get('employeePosition');
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
    if (this.editEmpForm) {
      const employeeStatus = this.editEmpForm.get('employeeStatus');
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
    console.log(this.editEmpForm.value)
    this.empService
      .editEmployee(this.id, this.editEmpForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('employees/list');
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
            this.router.navigate(['employees/list']);

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

  goBack(): void {
    this.router.navigate(['employees/list']);
  }
}
