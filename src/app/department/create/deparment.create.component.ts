import { Component } from '@angular/core';
import { Department } from '../../models/Department/department';
import { DepartmentService } from '../../services/department.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormArray, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/Employee/employee';


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
export class CreateComponent {
  depts!: Department[]; 
  emps!:Employee[]; 
  flag:number=0; 
  flagArray=[0,1];
  validationMessages = {
    departmentName: {
      required: 'You must enter the name of the department',
      pattern: 'Name should only contain letters',
    },
    managerId: {
      required: 'You must enter the managerId',
      pattern: 'should only contain numbers',
    },


  };
  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private deptService: DepartmentService,public fb:FormBuilder,private empService:EmployeeService,public router:Router) {} 
  ngOnInit() { 
    this.empService.getAllEmployees().subscribe((emps:any)=>{ 
      this.emps = emps; 
      console.log(emps); 
      
    }); 
    this.deptService.getAll().subscribe((depts:any)=>{ 
      this.depts = depts; 
      console.log(depts); 
    }); 


  } 
   
  createDeptForm = this.builder.group({ 
    departmentName: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ])
    ),
    managerId:  this.builder.control(
      0,
      Validators.compose([Validators.required])
    ),
    employessIds: this.builder.array([]),
  }) 

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
    this.flag= event.value;

  }

  goBack(): void {
    this.router.navigate(['department/list']);
  }

  createNewDept(){
    console.log(this.createDeptForm.value)
    if (this.createDeptForm.valid) {
      this.deptService.createDepartment(this.createDeptForm.value,this.flag).subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open('dept added successfully.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['project']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error.message, 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please enter valid data.', 'Close', {
        duration: 3000,
      });
    }

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
