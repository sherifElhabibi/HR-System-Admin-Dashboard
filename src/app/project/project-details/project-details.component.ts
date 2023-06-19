import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { GetProjectById } from 'src/app/models/project/GetProjectById';
import { Projectphases } from 'src/app/models/projectPhase/Projectphases ';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectphasesService } from 'src/app/services/projectphases.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: GetProjectById = new GetProjectById('',0,0,'','',new Date(),new Date(),'',[],[],[],[]);
  phases!:Projectphases[];
  constructor(
    public projectService: ProjectService,
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
}
