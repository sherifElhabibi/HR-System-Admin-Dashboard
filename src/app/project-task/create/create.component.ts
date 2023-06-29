import { Component } from '@angular/core';
import { ProjecttaskService } from 'src/app/services/projecttask.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  projects: any = [];
  projectId: any;

  constructor(
    public taskService: ProjecttaskService,
    public projectService: ProjectService,
    public fb: FormBuilder, public router: Router) {
    this.projectService.getAllProjects().subscribe((projectList) => {
      this.projects = projectList;
    });
  }
  matcher = new MyErrorStateMatcher();
  createProjectTaskForm = this.fb.group({
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
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).*$'),
      ],
    ],
    totalHoursPerTask: ['', [Validators.required]],
    // projectId: ['', [Validators.required]],

  });
  gettaskName() {
    return this.createProjectTaskForm.get('taskName');
  }
  gettaskDescription() {
    return this.createProjectTaskForm.get('taskDescription');
  }
  gettotalHoursPerTask() {
    return this.createProjectTaskForm.get('totalHoursPerTask');
  }
  // getprojectId() {
  //   return this.createProjectTaskForm.get('projectId');
  // }
  createProjectTask(): void {
    this.taskService.createProjectTask(this.createProjectTaskForm.value, this.projectId).subscribe(
      (response) => { this.router.navigateByUrl('/projecttask'); console.log(response) },
      (error) => console.log(error)
    );
  }


  onprojectIdChange(event: any) {
    this.projectId = event.value;

  }
  goBack(): void {
    this.router.navigate(['projecttask/list']);
  }

}