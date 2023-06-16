import { Component,NgModule,OnInit,NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {ProjectphasesService  } from '../../services/projectphases.service';
import { Project } from 'src/app/models/project';
import { Projectphases } from 'src/app/models/projectphases';
import { ActivatedRoute, Route } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],


})

export class ListComponent implements OnInit  {
  constructor(private projectservice: ProjectService,public activatedRoute:ActivatedRoute) {}
  projects:Project[]=[];
  projectPhases:Projectphases[] = [];
  // pro:Project=new Project("",0,0,0,"",new Date(),new Date(),"",[],[],0);
  // falg=false;
  //  projectPhaseName:any;
  //projectPhaseName:[]=[];
  ngOnInit(): void {
    this.projectservice.getAllProjects().subscribe(
      (response: any)=>{
        this.projects = response;
        console.log("all Projects :");
        console.log(this.projects);
        console.log(this.projects[0].projectPhases[0])
        
      },
      (error: any) => {
        console.log('Error retrieving projects:', error);
      }
    ); 
  }
  // showphases(id:number):void{
  //     if(id==undefined){
  //       console.log("id = undefined")
  //     }
  //     else{
  //       this.falg=true;
  //        this.projectservice.getProjectPhases(id).subscribe((response)=>{
  //       console.log("start show phase function .....")
  //       console.log(response)
  //       response.forEach((e :any)=> {
  //         this.projectPhaseName=e,
  //         console.log("foreach phasename"+this.projectPhaseName)
  //       });
  //         Swal.fire({
  //           icon: "success",
  //           title:"Project Phase Info",
  //           text: `projectPhaseName: ${   this.projectPhaseName.phaseName} \n
  //              phaseStartDate:  ${this.projectPhaseName.phaseStartDate}
  //             \n phaseEndDate:  ${this.projectPhaseName.phaseEndDate}
  //              \n phaseHrBudget:  ${this.projectPhaseName.phaseHrBudget}}`,
          
  //           showConfirmButton: false,
  //           timer: 5500
  //       });
  //       // Swal.fire('Project Phase Info',`projectPhaseName: ${this.projectPhaseName.phaseName}\n phaseStartDate:  ${this.projectPhaseName.phaseStartDate}\n phaseEndDate:  ${this.projectPhaseName.phaseEndDate} \n phaseHrBudget:  ${this.projectPhaseName.phaseHrBudget}`);
  //     })}
     
  //   }
  }

 