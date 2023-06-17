import { Component } from '@angular/core';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-create',
  templateUrl: './deparment.create.component.html',
  styleUrls: ['./deparment.create.component.scss']
})
export class CreateComponent {
  department: Department = new Department('', 0, [],"");
  departmentName: string = '';
  managerId: number = 0;
  stopornot: number = 0;
  employessIds: any; // Replace with your manager model/interface

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.fetchManagers();
  }

  fetchManagers() {
    this.departmentService.getManagers().subscribe(
      (managers) => {
        // this.employessIds = managers;
        console.log("managers------------");
        console.log(managers);
      },
      (error) => {
        console.error('Error fetching managers', error);
      }
    );
  }
  createDepartment(){
    this.department.departmentName=this.departmentName;
    this.department.managerId=this.managerId;
    this.department.employessIds=this.employessIds.toString().split(',').map(Number),

    this.departmentService.createDepartment(this.department,this.stopornot).subscribe((response)=>{
      console.log(response);
      alert("added finally ^_^");
    },
    error=>{
      console.log(error);
    }
    );
  }
}
