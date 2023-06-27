import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  idparams:any=0;
  currentDept:any;
  constructor(
    public departmentService: DepartmentService,
    private router: Router,
    public activatedRoute:ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {}
  ngOnInit():void {
    this.activatedRoute.params.subscribe((a)=>{
      this.departmentService.getById(a['id']).subscribe(data=>
        {
         this.idparams=a;
         this.currentDept=data;
         console.log(this.currentDept)
        })
       })
  }
  back() {
    this.router.navigateByUrl('department/list');
  }
}