import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjecttaskService } from 'src/app/services/projecttask.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
   idparams:any=0;
  constructor(
    public taskService: ProjecttaskService,
    public projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public activatedRoute:ActivatedRoute,
    private fb: FormBuilder

  ) {}
  ngOnInit():void {
    this.activatedRoute.params.subscribe((a)=>{
      this.taskService.getProjectTaskById(a['id'])
      .subscribe((task: any) => {
        this.idparams=a;
        console.log(this.idparams);
        this.editProjectTaskForm.patchValue(task)});
      })
  }

    matcher = new MyErrorStateMatcher();
    editProjectTaskForm = this.fb.group({
      taskName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]*'),
        ],
      ],
      taskDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).*$'),
        ],
      ],
      totalHoursPerTask: ['', [Validators.required]],
    });
    gettaskName() {
      return this.editProjectTaskForm.get('taskName');
    }
    gettaskDescription() {
      return this.editProjectTaskForm.get('taskDescription');
    }
    gettotalHoursPerTask() {
      return this.editProjectTaskForm.get('totalHoursPerTask');
    }
    
  
    editEmp() {
      
    this.activatedRoute.params.subscribe((a)=>{
      this.taskService.editProjectTask(a['id'],this.editProjectTaskForm.value).subscribe(() => {
        this.router.navigateByUrl("employees/list");
    });
    })
       
      };
  
  
  } 
   
  // updatetask(){
  //   this.activatedRoute.params.subscribe((a)=>{
  //     this.taskService.editProjectTask(a['id'],this.updateProjectTask).subscribe((editnew)=>{
  //       this.router.navigateByUrl("/department/list")
  //       console.log("editnew");
  //       console.log(editnew);
  //     })
  //   })
  //   }
