import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetProjectById } from 'src/app/models/project/GetProjectById';
import { GetProjectHoursAndTotalCost } from 'src/app/models/project/GetProjectHoursAndTotalCost';
import { ProjectService } from 'src/app/services/project.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: GetProjectById = new GetProjectById('',0,0,'','',new Date(),new Date(),'',[],[],[],[]);
  ProjectHoursAndTotalCost: GetProjectHoursAndTotalCost = new GetProjectHoursAndTotalCost(0,'',0,0);
  EmployeesCostsInProject:any[] = [];
  constructor(
    public projectService: ProjectService,
    public employeeService:EmployeeService,
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
        this.projectService.getProjectHoursAndTotalCost(parameters['id']).subscribe(
          (ProjectHoursAndTotalCost)=>{
            this.ProjectHoursAndTotalCost = ProjectHoursAndTotalCost;
            console.log(ProjectHoursAndTotalCost);
          }
        );
        this.employeeService.getEmployeesCostsInProject(parameters['id']).subscribe(
          (EmployeesCostsInProject)=>{
            this.EmployeesCostsInProject = EmployeesCostsInProject;
            console.log(EmployeesCostsInProject);
          }
        );
      });
  }

  back() {
    this.router.navigateByUrl('project');
  }
}
