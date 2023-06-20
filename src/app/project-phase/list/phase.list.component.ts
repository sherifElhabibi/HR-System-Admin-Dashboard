import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectPhaseById } from 'src/app/models/projectPhase/ProjectPhaseById';
import { ProjectphasesService } from 'src/app/services/projectphases.service';

@Component({
  selector: 'app-phase.list',
  templateUrl: './phase.list.component.html',
  styleUrls: ['./phase.list.component.scss']
})
export class PhaseListComponent {

  phase!: ProjectPhaseById;
  id!:number;
  constructor(private phaseService: ProjectphasesService,public activatedRoute:ActivatedRoute,public router:Router){}
  ngOnInit():void {
    this.activatedRoute.params.subscribe(params =>{
      this.id = +params['id'];
    })
    this.phaseService.getPhaseById(this.id).subscribe(data=>{
      this.phase = data;
    })
  }
}
