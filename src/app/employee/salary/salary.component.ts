import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  employeeId!: any;
  employeeSalaryData!: any;
  validationMessages = {
    startDate: {
      required: 'You must enter the start date.',
    },
    endDate: {
      required: 'You must enter the end date.',
    },
  }
  constructor(
    private router: Router,
    private routerActive: ActivatedRoute,
    private builder: FormBuilder,
    private employeeService: EmployeeService,
    private datePipe: DatePipe
  ) { }
  salaryFrom = this.builder.group({
    startDate: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    endDate: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
  });
  ngOnInit(): void {
    this.employeeId = this.routerActive.snapshot.paramMap.get('emplyeeId');
    console.log("salary", this.employeeId);
  }

  Calculate() {
    this.salaryFrom.value.startDate = this.datePipe.transform(
      this.salaryFrom.value.startDate,
      'yyyy-MM-dd'
    );
    this.salaryFrom.value.endDate = this.datePipe.transform(
      this.salaryFrom.value.endDate,
      'yyyy-MM-dd'
    );
    if (this.salaryFrom.valid) {
      const startDate = this.salaryFrom.value.startDate;
      const endDate = this.salaryFrom.value.endDate;

      if (startDate && endDate) {
        this.employeeService.getEmployeeSalary(this.employeeId, startDate, endDate).subscribe((data)=>{
          this.employeeSalaryData= data;
          console.log(this.employeeSalaryData,"salary");
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/employees/details', this.employeeId]);
  }
}
