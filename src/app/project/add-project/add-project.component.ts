import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GetAllProjects } from '../../models/project/GetAllProjects'
import { ProjectService } from '../../services/project.service'
import { EmployeeService } from '../../services/employee.service'
import { Project } from '../../models/project/Project'
import { Employee } from 'src/app/models/Employee/employee';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  projects: GetAllProjects[] = [];
  projectID: number = 0;
  projectDetails!:Project;
  employees:Employee[] =[];

  validationMessages = {
    projectName: {
      required: 'You must enter the name of the project',
      pattern: 'Name should only contain letters'
    },
    projectTotalBudget: {
      required: 'You must enter the project total budget.',
      pattern: 'Project total budget must be a non-negative number'
    },
    projectHours: {
      required: 'You must enter the project hours.',
      pattern: 'Project hours must be a non-negative integer',
    },
    projectLocation: {
      required: 'You must enter the project location.',
    },
    projectDescription: {
      required: 'You must enter the project description.',
    },
    projectStartDate: {
      required: 'You must enter the project description.',
    },
    projectEndDate: {
      required: 'You must enter the project description.',
    },
    projectStatus: {
      required: 'Project status is required.',
      enum: 'Invalid project status.',
    },
    /*------------- projectPhases validation -------------------*/
    phaseName: {
      required: 'You must enter the phase name.',
    },
    phaseStartDate: {
      required: 'You must enter the phase start date.',
    },
    phaseEndDate: {
      required: 'You must enter the phase end date.',
    },
    phaseMilestone: {
      required: 'You must enter the phase milestone.',
    },
    phaseHrBudget: {
      required: 'You must enter the phase hour budget.',
    },
  };

  constructor(
    public projectService: ProjectService,
    public employeeService:EmployeeService,
    private builder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.projectService.getAllProjects().subscribe((projectsArray) => {
      this.projects = projectsArray;
    });
  }

  projectform = this.builder.group({
    projectName: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])
    ),
    projectTotalBudget: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    projectStatus: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    projectHours: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    projectLocation: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    projectStartDate: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    projectEndDate: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),
    projectDescription: this.builder.control(
      '',
      Validators.compose([Validators.required])
    ),

    /* ---------------------------------------------------------   */
    projectPhases: this.builder.array([this.projectPhasesForm()]),
    employeesInProjectIds: this.builder.array([]),
  });

  projectPhasesForm() {
    return this.builder.group({
      phaseName: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      phaseStartDate: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      phaseEndDate: this.builder.control(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      phaseMilestone: this.builder.control('', Validators.required),
      phaseHrBudget: this.builder.control('', Validators.required),
    });
  }

  addProjectPhase() {
    this.projectform.controls['projectPhases'].push(this.projectPhasesForm());
  }
  removeProjectPhase(i: Required<number>) {
    this.projectform.controls['projectPhases'].removeAt(i);
  }
  get projectPhases() {
    return this.projectform.controls['projectPhases'] as FormArray;
  }

  save() {
    if (this.projectform.valid) {
      this.projectService
        .createProject(this.projectform.value)
        .subscribe(
          () => {
            this.snackBar.open('Project added successfully.', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['project']);
          },
          (error) => {
            this.snackBar.open(error.message, 'Close', {
              duration: 3000,
            });
          }
        );
    } else {
      this.snackBar.open('Please enter valid data.', 'Close', {
        duration: 3000,
      });
    }
  }
  goBack(): void {
    this.router.navigate(['project']);
  }
  getProject(id: string) {
    this.projectService
      .getProjectById(parseInt(id))
      .subscribe((currentProject) => {
        this.projectDetails = currentProject;
        console.log(currentProject);
      });
  }
  // getAllEmployees(){
  //   this.employeeService.getAllEmployees().subscribe((employeesList)=>{
  //     this.employees = employeesList;
  //   })
  // }
}
