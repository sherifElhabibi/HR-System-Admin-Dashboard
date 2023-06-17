import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  currentDept:Department=new Department("",0,[],"");
  dept:Department[]=[];
  emps:Employee[]=[];
  flag=false;
  selectsplit:any;
  employessIds:any =new Array()
  eachobject:any=new Array()
  constructor(public departmentService:DepartmentService,public activatedRoute:ActivatedRoute,public router:Router){}

  ngOnInit(){
    this.departmentService.getManagers().subscribe(empdata=>{
      this.emps=empdata;
      console.log("emps data from edit");
      console.log(this.emps);
    
    });
    this.departmentService.getAll().subscribe(data=>{
      this.dept=data;
      console.log("all depts")
       console.log(data);
    });



    this.activatedRoute.params.subscribe((a)=>{
      // this.appointmentId = a['id'];
      console.log(a);
      this.departmentService.getById(a['id']).subscribe(data=>{
        this.currentDept=data;
        //this.employessIds=this.currentDept.employees
        this.employessIds.push(data.employees);
        this.employessIds.forEach((element:any) => {
          console.log(element)
          element.forEach((x:any) => {
            console.log("eachobject++++++++++++++++")
            this.eachobject.push(x.employeeId);
            console.log(this.eachobject);
          });
       });
    })
    
    })
    
    };
    
  update(){
    console.log(this.currentDept);
    this.selectsplit=this.eachobject.toString().split(',').map(Number);

    this.departmentService.edit(this.currentDept).subscribe(data=>{
            this.router.navigateByUrl("/department/list")
            console.log(data);
          })
   }

  }

