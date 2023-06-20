import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/project/Project';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private projectservice: ProjectService,
    public activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  projects: Project[] = [];
  ngOnInit(): void {
    this.projectservice.getAllProjects().subscribe(
      (projectList) => {
        this.projects = projectList;
        console.log(projectList);
      },
      (error: any) => {
        console.log('Error retrieving projects:', error);
      }
    );
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectservice.deleteProject(id).subscribe(() => {
          this.projectservice.getAllProjects().subscribe((projectList)=>{
            this.projects=projectList;
          })
          this.snackBar.open('Project deleted', 'Close', {
            duration: 2000,
          });
        }, (error) => {
          console.error('Error deleting project:', error);
        });
      }
    });
  }
}
