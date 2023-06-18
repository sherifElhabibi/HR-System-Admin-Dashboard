import { Component,OnInit } from '@angular/core';
import { Employee } from '../../models/Employee/employee';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee.list.component.html',
  styleUrls: ['./employee.list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private empServ: EmployeeService,    
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }
  displayedColumns: string[] = ['employeeFirstName', 'employeeLastName','employeeProfileUrl', 'actions'];
  employees: Employee[]=[];
  ngOnInit(): void {
    this.empServ.getAllEmployees().subscribe(
      (response:any) => {
        this.employees = response;
        console.log(this.employees);
      },
      error => {
        console.log(error);
      }
    );
  }
  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empServ.deleteEmployeeById(id).subscribe(() => {
          const index = this.employees.findIndex((p) => p.emplyeeId === id);
          if (index >= 0) {
            this.employees.splice(index, 1);
            this.snackBar.open('project deleted', 'Close', {
              duration: 2000,
            });
            // this.employees = this.employees.filter(e => e.emplyeeId === id);
          }
        });
      }
    });
  }
}
