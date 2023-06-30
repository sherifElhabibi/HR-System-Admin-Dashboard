import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GetEmployeeProjects } from '../models/Employee/GetEmployeeProjects';
import { GetProjectPhasesForProject } from '../models/projectPhase/GetProjectPhasesForProject';
import { GetProjectTasksForProject } from '../models/ProjectTask/GetProjectTasksForProject';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { AttendanceService} from '../services/attendance.service'
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  employeeId!: number;
  employeeProjects: GetEmployeeProjects[] = [];
  projectPhases: GetProjectPhasesForProject[] = [];
  projectTasks: GetProjectTasksForProject[] = [];
  selectedProjectId: number | undefined;
  attendanceForm!: FormGroup;
  validationMessages = {
    projectId: {
      required: 'You must select project .'
    },
    projectPhaseId: {
      required: 'You must select project phase.'
    },
    projectTaskId: {
      required: 'You must select project task.',
    },
    date: {
      required: 'You must select attendance date.'
    },
    description: {
      required: 'You must enter the project description.',
    },
    hoursSpent: {
      required: 'You must enter the project hours spent.',
    }
  }
  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private datePipe:DatePipe,
    private attendanceService:AttendanceService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeId= this.authService.getID();
    this.employeeService.getEmployeeProjects(this.employeeId).subscribe((employeeProjects) => {
      this.employeeProjects = employeeProjects;
      console.log(this.employeeProjects)
    });

    this.attendanceForm = this.builder.group({
      projectId: this.builder.control(
        0,
        Validators.compose([Validators.required])
      ),
      projectPhaseId: this.builder.control(
        0,
        Validators.compose([Validators.required])
      ),
      projectTaskId: this.builder.control(
        0,
        Validators.compose([Validators.required])
      ),
      
      date: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      description: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      hoursSpent: this.builder.control(
        0,
        Validators.compose([Validators.required])
      )
    });
  }

  onProjectChange(): void {
    const selectedProject = this.employeeProjects.find((project) => project.projectId === this.selectedProjectId);
    if (selectedProject) {
      this.projectPhases = selectedProject.projectPhases;
      this.projectTasks = selectedProject.projectTaskes;
    }
  }

  submit(){
    this.attendanceForm.value.date = this.datePipe.transform(
      this.attendanceForm.value.date,
      'yyyy-MM-dd'
    );
    this.attendanceForm.value.employeeId= this.employeeId;
    this.attendanceService.attend(this.attendanceForm.value).subscribe(
      (response) => { 
      if(response.status==200){
        Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your Attendance has been saved',
              showConfirmButton: false,
              timer: 1500
            })

            }else{
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Attendance has been saved',
                showConfirmButton: false,
                timer: 1500
              })
            }
     },
      (error) => {
        console.log(error)
        if(error.status==200){
          Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              });
            }
       else{
        Swal.fire({
          icon: 'error',
          title: `Please enter valid data,${error.errors}`,
          showConfirmButton: false,
          timer: 1500
        })
       }
      }
    );
  }
}
