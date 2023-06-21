import { Component, OnInit } from '@angular/core';
import {ProjectphasesService} from '../../services/projectphases.service';
import { ProjectPhaseById } from 'src/app/models/projectPhase/ProjectPhaseById';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-phase.details',
  templateUrl: './phase.details.component..html',
  styleUrls: ['./phase.details.component.scss']
})
export class PhaseDetailsComponent implements OnInit {
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
  
  back() {
    this.router.navigateByUrl('/phases/list');
  }
}
