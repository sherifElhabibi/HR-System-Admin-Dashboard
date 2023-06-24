import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/Department/department';
import { Employee } from 'src/app/models/Employee/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

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
      pattern: 'Name should only contain letters',
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
          Validators.pattern('^[a-zA-Z]+$'),
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
            //  // Populate manager Id
            //  let managerIdindept = this.deptform.get(
            //   'managerId'
            // );
            // managerIdindept=this.builder.control(managerIdindept);
          
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

  save() {
    // if (this.deptform) {
    //   const managerId = this.deptform.get('managerId');
    //   if (managerId) {
    //     const managerValue = managerId.value;
    //     if (typeof managerValue === 'string') {
    //       const parsedValue = parseFloat(managerValue);
    //       if (!isNaN(parsedValue)) {
    //         managerId.setValue(parsedValue);
    //       }
    //     }
    //   }
    // }
    console.log(this.deptform.value);
     if (this.deptform.valid) {
      console.log(this.deptform.value);
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
              (error) => {
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
      });
   }
   
  }



}


