import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { ProjectphasesService } from 'src/app/services/projectphases.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

@Component({
  selector: 'app-phase.list',
  templateUrl: './phase.list.component.html',
  styleUrls: ['./phase.list.component.scss']
})
export class PhaseListComponent {

  phase: any;
  phases: any;
  id!:number;
  position!:string;
  constructor(
    private phaseService: ProjectphasesService,
    public activatedRoute:ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public authService:AuthService,
    public router:Router){}
  
  ngOnInit():void {
    this.phaseService.getAllPhases().subscribe((data)=>{
      this.phases=data;
      console.log(this.phases);
    })
    this.position = this.authService.getPostion();
  }

  delete(id: number) {
    this.activatedRoute.params.subscribe((parameters) => {
      this.phaseService
        .getPhaseById(id)
        .subscribe((Object) => {
          this.phase = Object;
          console.log(Object);
        });
      })
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.phaseService.deletePhase(this.phase.id).subscribe(() => {
          const index = this.phases.findIndex((p:any) => p.phaseId === this.phase.id);
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
}
