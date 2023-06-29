import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service'
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
  activatedRoute:ActivatedRoute,
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
