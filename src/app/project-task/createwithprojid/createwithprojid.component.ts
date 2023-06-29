import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjecttaskService } from 'src/app/services/projecttask.service';
import { MyErrorStateMatcher } from '../create/create.component';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createwithprojid',
  templateUrl: './createwithprojid.component.html',
  styleUrls: ['./createwithprojid.component.scss']
})
export class CreatewithprojidComponent {
  idparam: any;
  constructor(public taskService: ProjecttaskService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder, public router: Router) {

  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((a) => {

      this.idparam = a['id'];
    });


  }

  matcher = new MyErrorStateMatcher();
  createProjectTaskForm = this.fb.group({
    taskName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9\\s]*$'),
      ],
    ],
    taskDescription: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).+$'),
      ],
    ],
    totalHoursPerTask:  ['', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]],


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

  createProjectTask(): void {
    this.taskService.createTaskwithprojId(this.createProjectTaskForm.value, this.idparam).subscribe(
      (response) => { this.router.navigateByUrl('/projecttask');},
      (error) =>{
        if(error.status==200){
          Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
       }
       else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              showConfirmButton: false,
            })
       }
      }
    );
  }
  goBack(): void {
    this.router.navigate(['project/details/' + this.idparam]);
  }
}
