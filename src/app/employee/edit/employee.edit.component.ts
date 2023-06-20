import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/Department/department';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './employee.edit.component.html',
  styleUrls: ['./employee.edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  depts: Department[] = [];
  id!:number;
  constructor(
    public empService: EmployeeService,
    private deptService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit():void {
    this.route.params.subscribe((params: any) => {
       this.id =+params['emplyeeId']});
      this.empService.getEmployeeById(this.id).subscribe((employee: any) => {
      this.editEmpForm.patchValue(employee)});
  }

  matcher = new MyErrorStateMatcher();
  editEmpForm = this.fb.group({
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
    employeeSalaryPerHour: [0, [Validators.required]],
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
    return this.editEmpForm.get('employeeFirstName');
  }

  getLname() {
    return this.editEmpForm.get('employeeLastName');
  }

  getSalaryPerHour() {
    return this.editEmpForm.get('employeeSalaryPerHour');
  }

  getOverTime() {
    return this.editEmpForm.get('employeeOverTime');
  }

  getSalary() {
    return this.editEmpForm.get('employeeSalary');
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

  getHiringDate() {
    return this.editEmpForm.get('employeeHiringDate');
  }

  display() {
    return console.log(this.editEmpForm);
  }


  editEmp() {
      this.empService.editEmployee(this.id,this.editEmpForm.value).subscribe(() => {
        this.router.navigateByUrl("employees/list");
    });
    };


    
  }

