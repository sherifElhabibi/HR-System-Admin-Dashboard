import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../models/department';
import { DepartmentService } from '../../services/department.service';


@Component({
  selector: 'app-list',
  templateUrl: './deparment.list.component.html',
  styleUrls: ['./deparment.list.component.scss']
})
export class ListComponent implements OnInit {


  constructor(public departmentService:DepartmentService,activatedRoute:ActivatedRoute,public router:Router){}
  dept:Department[]=[];
  flag=false;
  currentDept:Department=new Department("",0,[]);
  ngOnInit(){
    this.departmentService.getAllDepartments().subscribe(data=>{
     this.dept=data;
      console.log(data);
   }); }}