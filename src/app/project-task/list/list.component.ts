import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TaskWithProjectName } from 'src/app/models/ProjectTask/TaskWithProjectName';

import { AuthService } from '../../services/auth.service'
import { ProjecttaskService } from 'src/app/services/projecttask.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(
  public taskService:ProjecttaskService,
  public router:Router,
  public authService:AuthService,
  ){}
  tasks:TaskWithProjectName[]=[];
  id:any;
  position!:string;
  ngOnInit(){
    this.taskService.getAll().subscribe(data=>{
      this.tasks=data;
    });
    this.position = this.authService.getPostion();
  }
}
