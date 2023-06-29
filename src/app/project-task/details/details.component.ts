import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjecttaskService } from 'src/app/services/projecttask.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  idparams:any=0;
  taskWithProjectName:any;
  position!:string;  
  constructor(
    public taskService: ProjecttaskService,
    public projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public activatedRoute:ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService:AuthService

  ) {}
  
  ngOnInit():void {
    this.activatedRoute.params.subscribe((a)=>{
      this.taskService.getProjectTaskById(a['id']).subscribe(data=>
        {
         this.idparams=a;
         this.taskWithProjectName=data;
         console.log(this.taskWithProjectName)
        })
       })
       this.position = this.authService.getPostion();

  }
  
  delete(id: number) {
    this.activatedRoute.params.subscribe((a)=>{
      const dialogRef = this.dialog.open(DeleteConfirmationComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.taskService.deleteProjectTaskById(a['id']).subscribe(() => {
           
          
              this.snackBar.open('project deleted', 'Close', {
                duration: 2000,
              });
          
          });
        }
      });
    })
   
  }
  back() {
    this.router.navigateByUrl('projecttask/list');
  }
}
