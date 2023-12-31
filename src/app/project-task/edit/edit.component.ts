import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjecttaskService } from 'src/app/services/projecttask.service';
import { DeleteConfirmationComponent } from 'src/app/shared/delete-confirmation.component';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  idparams: any = 0;
  constructor(
    public taskService: ProjecttaskService,
    public projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((a) => {
      this.taskService.getProjectTaskById(a['id']).subscribe((task: any) => {
        this.idparams = a;
        this.editProjectTaskForm.patchValue(task);
      });
    });
  }

  matcher = new MyErrorStateMatcher();
  editProjectTaskForm = this.fb.group({
    taskName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9\\s]*$'),
      ],
    ],
    taskDescription: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).+$'),
      ],
    ],
    totalHoursPerTask:  ['', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]],
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

  goBack(): void {
    this.router.navigate(['projecttask/list']);
  }

  editEmp() {
    this.activatedRoute.params.subscribe((a) => {
      this.taskService
        .editProjectTask(a['id'], this.editProjectTaskForm.value)
        .subscribe(() => {
          this.router.navigateByUrl('employees/list');
        },
        (error)=>{
               if(error.status==200){
        Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['projecttask/list']);

     }
     else{
          Swal.fire({
            icon: 'warning',
            text: 'Check your data !',
            showConfirmButton: false,
            timer:3000,
          })
     }
        });
    });
  }
}


