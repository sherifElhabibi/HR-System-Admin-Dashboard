import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetProjectById } from 'src/app/models/project/GetProjectById';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: GetProjectById = new GetProjectById('',0,0,'','',new Date(),new Date(),'',[],[],[],[]);
  constructor(
    public projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((parameters) => {
      this.projectService
        .getProjectById(parameters['id'])
        .subscribe((projectObject) => {
          this.project = projectObject;
          console.log(projectObject);
        });
    });
  }

  back() {
    this.router.navigateByUrl('project');
  }
}
