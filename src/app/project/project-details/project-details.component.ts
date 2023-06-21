import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  idparam:any=0;
  // @Output() outputEvent: EventEmitter<any> = new EventEmitter();

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
          this.project.projectId = parameters;
          console.log(this.project);
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
  // passingid(){
  //   this.outputEvent.emit(this.project.projectId);
  // }

  getCostColor(): string {
    let half = this.project.projectTotalBudget / 2;

    if (this.ProjectHoursAndTotalCost.totalCost <= half) {
      return 'green';
    } else if (this.ProjectHoursAndTotalCost.totalCost > half && this.ProjectHoursAndTotalCost.totalCost <= this.project.projectTotalBudget) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  getTotalHoursColor(): string {
    let halfHours = this.project.projectHours / 2;

    if (this.ProjectHoursAndTotalCost.totalHoursSpent <= halfHours) {
      return 'green';
    } else if (this.ProjectHoursAndTotalCost.totalHoursSpent > halfHours && this.ProjectHoursAndTotalCost.totalHoursSpent <= this.project.projectHours) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

}
