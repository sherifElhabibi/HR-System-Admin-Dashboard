import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';
import { GetAllEmployees } from '../../models/Employee/GetAllEmployees';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  projectID: number = 0;
  employees: GetAllEmployees[] = [];
  phaseOptions: any[] = [
    { value: 0, label: 'Information Gathering' },
    { value: 1, label: 'Specification' },
    { value: 2, label: 'Project Planning' },
    { value: 3, label: 'Implementation' },
    { value: 4, label: 'Final Test and Delivery' },
    { value: 5, label: 'Maintenance and Support' },
    { value: 6, label: 'Other' }
  ];

  validationMessages = {
    projectName: {
      required: 'You must enter the name of the project',
      pattern: 'Name can use combination of uppercase and lowercase letters, numbers, and spaces',
      minLength: 'Project should be at least 3 characters long',
      maxLength: 'Project should be at most 20 characters long'
    },
    projectTotalBudget: {
      required: 'You must enter the project total budget.',
      pattern: 'Project total budget must be a non-negative number',
    },
    projectHours: {
      required: 'You must enter the project hours.',
      pattern: 'Project hours must be a non-negative integer',
    },
    projectLocation: {
      required: 'You must enter the project location.',
      pattern: 'Location can contains combination of uppercase and lowercase letters, numbers, and spaces',
      minLength: 'Project location should be at least 3 characters long',
      maxLength: 'Project location should be at most 20 characters long'
    },
    projectDescription: {
      required: 'You must enter the project description.',
      pattern: 'Location can contains combination of uppercase and lowercase letters, numbers, and spaces',
      minLength: 'Project description should be at least 3 characters long',
      maxLength: 'Project description should be at most 60 characters long'
    },
    projectStartDate: {
      required: 'You must enter the project start date.',
    },
    projectEndDate: {
      required: 'You must enter the project end date.',
    },
    projectStatus: {
      required: 'Project status is required.',
      enum: 'Invalid project status.',
    },
    /*------------- projectPhases validation -------------------*/
    phaseName: {
      required: 'You must enter the phase name.',
      pattern: 'Phase name can contains combination of uppercase and lowercase letters, numbers, and saces',
      minLength: 'Project name should be at least 3 characters long',
      maxLength: 'Project name should be at most 20 characters long'
    },
    phaseStartDate: {
      required: 'You must enter the phase start date.',
    },
    phaseEndDate: {
      required: 'You must enter the phase end date.',
    },
    phaseMilestone: {
      required: 'You must enter the phase milestone.',
      pattern: 'Milestone can contains combination of uppercase and lowercase letters, numbers, and spaces',
      minLength: 'Project milestone should be at least 3 characters long',
      maxLength: 'Project milestone should be at most 20 characters long'
    },
    phaseHrBudget: {
      required: 'You must enter the phase hour budget.',
      pattern: 'phase Hr Budget must be a non-negative number',
    },
  };

  constructor(
    public projectService: ProjectService,
    public employeeService: EmployeeService,
    private builder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    this.employeeService.getAllEmployees().subscribe((employeeList) => {
      this.employees = employeeList;
    });
  }

  projectform = this.builder.group({
    projectName: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9\\s]*$'),
      ])
    ),
    projectTotalBudget: this.builder.control(
      0,
      Validators.compose([
        Validators.required,
         Validators.pattern('^[0-9]+$')
        ])
    ),
    projectStatus: this.builder.control(
      0,
      Validators.compose([Validators.required])
    ),
    projectHours: this.builder.control(
      0,
      Validators.compose([
        Validators.required, 
        Validators.pattern('^[0-9]+$')
      ])
    ),
    projectLocation: this.builder.control(
      '',
      Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9\\s]*$')
      ])
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
      Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-Z0-9\\s]*$')
      ])
    ),
    projectPhases: this.builder.array([this.projectPhasesForm()]),
    employeesInProjectIds: this.builder.array([]),
  });

  projectPhasesForm() {
    return this.builder.group({
      phaseName: this.builder.control(
        0,
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9\\s]*$')
          ])
      ),
      phaseStartDate: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      phaseEndDate: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      phaseMilestone: this.builder.control(
        '',
        Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20), 
        Validators.pattern('^[a-zA-Z0-9\\s]*$')
      ])
      ),
      phaseHrBudget: this.builder.control(0,
        Validators.compose([
          Validators.required, 
          Validators.pattern('^[0-9]+$')
        ]) 
        ),
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
  get employeesInProjectIds(): FormArray {
    return this.projectform.get('employeesInProjectIds') as FormArray;
  }
  onEmployeeSelectionChange(event: any) {
    const selectedEmployeeIds = event.value;
    this.employeesInProjectIds.clear();
    selectedEmployeeIds.forEach((emplyeeId: string) => {
      this.employeesInProjectIds.push(this.builder.control(emplyeeId));
    });
  }

  save() {
    this.projectform.value.projectStartDate = this.datePipe.transform(
      this.projectform.value.projectStartDate,
      'yyyy-MM-dd'
    );
    this.projectform.value.projectEndDate = this.datePipe.transform(
      this.projectform.value.projectEndDate,
      'yyyy-MM-dd'
    );

    if (this.projectform) {
      const projectTotalBudget = this.projectform.get('projectTotalBudget');
      if (projectTotalBudget) {
        const budgetValue = projectTotalBudget.value;
        if (typeof budgetValue === 'string') {
          const parsedValue = parseFloat(budgetValue);
          if (!isNaN(parsedValue)) {
            projectTotalBudget.setValue(parsedValue);
          }
        }
      }

      const projectStatus = this.projectform.get('projectStatus');
      if (projectStatus) {
        const statusValue = projectStatus.value;
        if (typeof statusValue === 'string') {
          const parsedValue = parseInt(statusValue, 10);
          if (!isNaN(parsedValue)) {
            projectStatus.setValue(parsedValue);
          }
        }
      }

      const projectHours = this.projectform.get('projectHours');
      if (projectHours) {
        const hoursValue = projectHours.value;
        if (typeof hoursValue === 'string') {
          const parsedValue = parseInt(hoursValue, 10);
          if (!isNaN(parsedValue)) {
            projectHours.setValue(parsedValue);
          }
        }
      }


      const phases = this.projectform.get('projectPhases') as FormArray | null;
      if (phases && phases.length > 0) {
        phases.controls.forEach(
          (phase: AbstractControl<any, any>, index: number) => {
            const phaseGroup = phase as FormGroup;

            const phaseName = phaseGroup.get('phaseName');
            if (phaseName) {
              const nameValue = phaseName.value;
              if (typeof nameValue === 'string') {
                const parsedValue = parseInt(nameValue, 10);
                if (!isNaN(parsedValue)) {
                  phaseName.setValue(parsedValue);
                }
              }
            }

            const phaseHrBudget = phaseGroup.get('phaseHrBudget');
            if (phaseHrBudget) {
              const budgetValue = phaseHrBudget.value;
              if (typeof budgetValue === 'string') {
                const parsedValue = parseInt(budgetValue, 10);
                if (!isNaN(parsedValue)) {
                  phaseHrBudget.setValue(parsedValue);
                }
              }
            }
          }
        );
      }
    }
    console.log(this.projectform.value)
    if (this.projectform.valid) {
      this.projectService.createProject(this.projectform.value).subscribe(
        () => {
          this.snackBar.open('Project added successfully.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['project']);
        },
        (error) => {
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
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please enter valid data',
        showConfirmButton: false,
        timer: 1500
      })
      // this.snackBar.open('Please enter valid data.', 'Close', {
      //   duration: 3000,
      // });
    }
  }

  getPhaseOptions(index: number): any[] {
    const selectedOptions: number[] = [];
    for (let i = 0; i < index; i++) {
      const phase = this.projectPhases.controls[i].value;
      selectedOptions.push(phase.phaseName);
    }

    return this.phaseOptions.filter(option => {
      return option.value === 6 || !selectedOptions.includes(option.value);
    });
  }

  goBack(): void {
    this.router.navigate(['project']);
  }
}
