import { Component } from '@angular/core';
import { Department } from '../../models/Department/department';
import { DepartmentService } from '../../services/department.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
  templateUrl: './deparment.create.component.html',
  styleUrls: ['./deparment.create.component.scss']
})
export class CreateComponent{
  ngOnInit(){
    this.empService.getAllEmployees().subscribe((data)=>{
         this.emps=data;
         console.log(this.emps)
    })
  }
  check:any=1;
  emps:any;
  constructor(
    public deptService: DepartmentService,
    public empService: EmployeeService,
     public fb: FormBuilder, public router:Router) {}
  matcher = new MyErrorStateMatcher();
  createDepartmentForm = this.fb.group({
    departmentName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*'),
      ],
    ],
    managerId:    ['', [Validators.required]],
    employessIds: [[], [Validators.required]],
  

  });
  getdepartmentName() {
    return this.createDepartmentForm.get('departmentName');
  }
  getmanagerId() {
    return this.createDepartmentForm.get('managerId');
  }
  getemployessIds() {
    return this.createDepartmentForm.get('employessIds');
  }
  createDepartment(): void {
    this.deptService.createDepartment(this.createDepartmentForm.value,this.check).subscribe(
      
      (response) => {this.router.navigateByUrl('/department/list');console.log(this.check); console.log(response)},
      
      (error) => {console.log(error);console.log(this.check); console.log(this.getemployessIds()?.value)}
    );
  }









}




// export class CreateComponent {
//   department: Department = new Department('', 0, [],"");
//   departmentName: string = '';
//   managerId: number = 0;
//   stopornot: number = 0;
//   employessIds: any; // Replace with your manager model/interface

//   constructor(private departmentService: DepartmentService) {}

//   ngOnInit() {
//     this.fetchManagers();
//   }

//   fetchManagers() {
//     this.departmentService.getManagers().subscribe(
//       (managers) => {
//         // this.employessIds = managers;
//         console.log("managers------------");
//         console.log(managers);
//       },
//       (error) => {
//         console.error('Error fetching managers', error);
//       }
//     );
//   }
//   createDepartment(){
//     this.department.departmentName=this.departmentName;
//     this.department.managerId=this.managerId;
//     this.department.employessIds=this.employessIds.toString().split(',').map(Number),

//     this.departmentService.createDepartment(this.department,this.stopornot).subscribe((response)=>{
//       console.log(response);
//       alert("added finally ^_^");
//     },
//     error=>{
//       console.log(error);
//     }
//     );
//   }
// }
