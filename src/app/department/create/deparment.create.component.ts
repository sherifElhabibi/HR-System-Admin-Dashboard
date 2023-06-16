// import { Component, Input } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Department } from '../../models/department';
// import { DepartmentService } from '../../services/department.service';
// import { environment } from 'src/environment/environment';
// import { HttpClient } from '@angular/common/http';
// import { EmployeeService } from 'src/app/services/employee.service';
// import { Employee } from 'src/app/models/employee';


// @Component({
//   selector: 'app-create',
//   templateUrl: './deparment.create.component.html',
//   styleUrls: ['./deparment.create.component.scss']
// })
// export class CreateComponent {
//   constructor(public departmentService:DepartmentService,public empServ:EmployeeService,activatedRoute:ActivatedRoute,public router:Router,public http:HttpClient){}
 
//   employees: Employee[]=[];
//   depart:Department=new Department("",0,[]);
//   managerName: string = "";
//   selectedManagerId: number | undefined;
//  // managerId:number|undefined;

//   ngOnInit(): void {
//     this.empServ.getAllEmployees().subscribe(
//       (response:any) => {
//         this.employees = response;
//         console.log(this.employees);
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }

//   createDepartment():void{
//     const employeeIdsArray = this.depart.employessIds.toString().split(',').map(Number);
//     this.depart.employessIds = employeeIdsArray;
//     this.depart.managerId=this.selectedManagerId;
//     console.log(this.selectedManagerId);
//     // this.employees.forEach(element => {
//     // if (this.depart.mangerName==element.firstName) {
//     //   this.depart.managerId=element.id;
//     //   console.log(this.depart.mangerName);
//     //   console.log(this.depart.managerId);
//     // }
//     // else{
//     //   console.log("ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
//     // }
//     //  });
//     this.departmentService.create(this.depart)
//     .subscribe(data=>{
//       this.depart=data;
//        console.log(data);
//        this.router.navigateByUrl("/department/list")
//     });
//   }


//   // createDepartment(): void {
//   //   this.getManagerIdByName(this.managerName).then((managerId) => {
//   //     if (managerId) {
//   //       this.depart.managerId = managerId;

//   //       const employeeIdsArray = this.depart.employessIds.toString().split(',').map(Number);
//   //       this.depart.employessIds = employeeIdsArray;
//   //       this.departmentService.create(this.depart).subscribe(
//   //         (data) => {
//   //           this.depart = data;
//   //           console.log(data);
//   //           this.router.navigateByUrl('/department/list');
//   //         },
//   //         (error) => {
//   //           console.error('Error creating department', error);
//   //           // Handle error
//   //         }
//   //       );
//   //     } else {
//   //       console.error('Manager ID not found for the provided manager name');
//   //       // Handle error
//   //     }
//   //   });
//   // }








//   // getManagerIdByName(managerName: string): Promise<number> {
//   //   return new Promise<number>((resolve, reject) => {
//   //     this.http.get<any[]>(environment.baseApi + '/employees').subscribe(
//   //       (employees) => {
//   //         const manager = employees.find((employee) => employee.firstName === managerName);
//   //         if (manager) {
//   //           resolve(manager.id);
//   //         } else {
//   //           reject('Manager ID not found for the provided manager name');
//   //         }
//   //       },
//   //       (error) => {
//   //         reject('Error retrieving employees data');
//   //       }
//   //     );
//   //   });
//   // }
 
// }






// import { Component } from '@angular/core';
// import { Department } from '../../models/department';
// import { DepartmentService } from '../../services/department.service';

// @Component({
//   selector: 'app-create',
//   templateUrl: './deparment.create.component.html',
//   styleUrls: ['./deparment.create.component.scss']
// })
// export class CreateComponent {
//   depart: Department = new Department('', 0, []);

//   selectedManager: any; // Updated property to hold the selected manager object
//   managers: any[] = []; // Updated property to store the list of managers

//   constructor(public departmentService: DepartmentService) {}
//   ngOnInit():void{
//     this.departmentService.getManagers().subscribe(
//       (response:any) => {
//         this.managers = response;
//         console.log("managerrrrs");
//         console.log(this.managers);
//       },
//       (error) => {
//         console.error('Error retrieving managers', error);
//         // Handle error
//       }
//     );

// }
//   createDepartment(): void {
//     if (this.selectedManager) {
//       this.depart.managerId = this.selectedManager.emplyeeId;

//       const employeeIdsArray = this.depart.employessIds.toString().split(',').map(Number);
//       this.depart.employessIds = employeeIdsArray;

//       this.departmentService.create(this.depart).subscribe(
//         (data) => {
//           this.depart = data;
//           console.log("depts");
//           console.log(data);
//           // Redirect to the department list page
//         },
//         (error) => {
//           console.error('Error creating department', error);
//           // Handle error
//         }
//       );
//     } else {
//       console.error('No manager selected');
//       // Handle error
//     }
//   }

//   // You'll need to implement a method to fetch the list of managers

 
// }



import { Component } from '@angular/core';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-create',
  templateUrl: './deparment.create.component.html',
  styleUrls: ['./deparment.create.component.scss']
})
export class CreateComponent {
  department: Department = new Department('', 0, []);
  managerName: string = '';
  managers: any[] = []; // Replace with your manager model/interface

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.fetchManagers();
  }

  fetchManagers() {
    this.departmentService.getManagers().subscribe(
      (managers) => {
        this.managers = managers;
      },
      (error) => {
        console.error('Error fetching managers', error);
      }
    );
  }

  createDepartment() {
    const employeeIdsArray = this.department.employessIds.toString().split(',').map(Number);
        this.department.employessIds = employeeIdsArray;
    const selectedManager = this.managers.find(
      (manager) => manager.firstName === this.managerName
    );
    if (selectedManager) {
      this.department.managerId = selectedManager.id;
      this.departmentService.createDepartment(this.department).subscribe(
        (data) => {
          console.log('Department created successfully:', data);
          // Handle success
        },
        (error) => {
          console.error('Error creating department', error);
          // Handle error
        }
      );
    } else {
      console.error('Selected manager not found');
      // Handle error
    }
  }
}
