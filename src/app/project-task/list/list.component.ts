import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/Department/department';
import { ProjectTask } from 'src/app/models/ProjectTask/projectTask';
import { TaskWithProjectName } from 'src/app/models/ProjectTask/TaskWithProjectName';
import { ProjecttaskService } from 'src/app/services/projecttask.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(
  public taskService:ProjecttaskService,
  activatedRoute:ActivatedRoute
  ,public router:Router){}
  tasks:TaskWithProjectName[]=[];
  id:any;
  ngOnInit(){

    this.taskService.getAll().subscribe(data=>{
      this.tasks=data;
      console.log("all depts")
      console.log(this.tasks);
    });

  }
}
