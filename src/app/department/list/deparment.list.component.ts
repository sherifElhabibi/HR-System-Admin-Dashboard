import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../models/Department/department';
import { DepartmentService } from '../../services/department.service';
import { Employee } from 'src/app/models/Employee/employee';
import DataTables from 'datatables.net';


@Component({
  selector: 'app-list',
  templateUrl: './deparment.list.component.html',
  styleUrls: ['./deparment.list.component.scss']
})
export class ListComponent implements OnInit {

  public  E2:any;
  constructor(public departmentService:DepartmentService,activatedRoute:ActivatedRoute,public router:Router){}
  depts:Department[]=[];
  emps:Employee[]=[];
  flag=false;
  idd!: number;
  targetDepartmentId!: number;
  selectedEmployeeIds: any =new Array();
  eachobject:any =new Array()
  selectsplit:any;
  currentDept:Department=new Department("",0,[],"");
  deleteoneDept:Department=new Department("",0,[],"");
  ngOnInit(){
    this.departmentService.getManagers().subscribe(empdata=>{
      this.emps=empdata;
      console.log("emps data");
      console.log(this.emps);
   

    });
    this.departmentService.getAll().subscribe(data=>{
      this.depts=data;

    //  data.forEach((element:any) => {
    //   if(element.departmentId!=this.idd){}
    //    this.selectedEmployeeIds.add(element.departmentId)
    //  });
    // data.forEach((element: any) => {
    //   if (element.departmentId != this.idd) {
    //     this.selectedEmployeeIds.add(element.departmentId);
    //   }
    // });
       console.log("selectedEmployeeIds")
     console.log(this.selectedEmployeeIds);
      console.log("all depts")
      console.log(this.depts);
    });

  }

  deleteDept(idd:any,targetDepartmentId:number,selectedEmployeeIds:any) {
    this.selectsplit=this.selectedEmployeeIds.toString().split(',').map(Number);
       this.departmentService.deleteById(idd, targetDepartmentId, this.selectsplit).subscribe(
      (response) => {
        alert('Department deleted successfully');
      },
      (error) => {
        alert('Failed to delete department');
      }
    );
  

   
 
  }
  show(depid:any){
    this.flag=true;
    this.departmentService.getById(depid).subscribe(data=>{
      this.deleteoneDept.employessIds=data.employessIds;
      console.log("data.employees.employeeId************************")
      console.log(data.employees);
      this.idd=depid;
      this.selectedEmployeeIds.push(data.employees);
       console.log("deleteoneDept++++++++++++++++")
       this.selectedEmployeeIds.forEach((element:any) => {
        console.log(element)
        element.forEach((x:any) => {
          console.log("eachobject++++++++++++++++")
          this.eachobject.push(x.employeeId);
          console.log(this.eachobject);
        });
}     );


 
   });
  }


  editDept(deptedit:Department){
    this.router.navigateByUrl(`/department/edit/${deptedit.departmentId}`)
    return this.E2=deptedit;
  }
  save(current:Department){
    this.flag=true;
    this.currentDept=current;
    console.log(this.currentDept);
 }
}





  // delete(id:Number){
  //   if(confirm('are you sure?!')){
  //     this.doctorService.deleteById(id).subscribe(a=>{
  //       console.log(a);
  //       for (let i = 0; i < this.doc.length; i++) {
  //         if(id == this.doc[i]._id){
  //           this.doc.splice(i,1);
  //           break;
  //         }
  //       }
  //     });
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'deleted Successfully &#128077;',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })

  //   }
  // }
  
  // update(deptedit:Department){
  //   this.departmentService.edit(deptedit).subscribe(data=>{
  //     // this.doc=data;
  //           this.router.navigateByUrl("/#")
  //           console.log(data);
  //         })
  //  }