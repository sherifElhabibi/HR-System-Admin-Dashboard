import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { GetProjectById } from 'src/app/models/project/GetProjectById';
import { Projectphases } from 'src/app/models/projectPhase/Projectphases ';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectphasesService } from 'src/app/services/projectphases.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';
import { GetProjectHoursAndTotalCost } from 'src/app/models/project/GetProjectHoursAndTotalCost';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: GetProjectById = new GetProjectById('',0,0,'','',new Date(),new Date(),'',[],[],[],[]);
  phases!:Projectphases[];
  ProjectHoursAndTotalCost: GetProjectHoursAndTotalCost = new GetProjectHoursAndTotalCost(0,'',0,0);
  EmployeesCostsInProject:any[] = [];
  constructor(
    public projectService: ProjectService,
    public employeeService:EmployeeService,
    private activatedRoute: ActivatedRoute,
    private phaseService: ProjectphasesService,
    private dialoge:MatDialog,
    private snackBar:MatSnackBar,
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
  delete(id: number) {
    const dialogRef = this.dialoge.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.phaseService.deletePhase(id).subscribe(() => {
          const index = this.phases.findIndex((p) => p.Id === id);
          if (index >= 0) {
            this.phases.splice(index, 1);
            this.snackBar.open('phase deleted', 'Close', {
              duration: 2000,
            });
          }
        });
      }
    });
  }
  back() {
    this.router.navigateByUrl('project');
  }
  getHoursColor(hours: number, hoursSpent?: number): string {
    if (hours > (hoursSpent || 0)) {
      return 'green';
    } else if (hours > (hoursSpent || 0) / 2) {
      return 'yellow';
    } else {
      return 'initial';
    }
  }
}
