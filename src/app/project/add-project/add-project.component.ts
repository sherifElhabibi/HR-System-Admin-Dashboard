import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../services/employee.service';
import { GetAllEmployees } from '../../models/Employee/GetAllEmployees';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  projectID: number = 0;
  employees: GetAllEmployees[] = [];

  validationMessages = {
    projectName: {
      required: 'You must enter the name of the project',
      pattern: 'Name should only contain letters',
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
        Validators.pattern('^[a-zA-Z]+$'),
      ])
    ),
    projectTotalBudget: this.builder.control(
      0,
      Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])
    ),
    projectStatus: this.builder.control(
      0,
      Validators.compose([Validators.required])
    ),
    projectHours: this.builder.control(
      0,
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
    projectPhases: this.builder.array([this.projectPhasesForm()]),
    employeesInProjectIds: this.builder.array([]),
  });

  projectPhasesForm() {
    return this.builder.group({
      phaseName: this.builder.control(
        0,
        Validators.compose([Validators.required])
      ),
      phaseStartDate: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      phaseEndDate: this.builder.control(
        '',
        Validators.compose([Validators.required])
      ),
      phaseMilestone: this.builder.control('', Validators.required),
      phaseHrBudget: this.builder.control(0, Validators.required),
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
        const firstPhase = phases.at(0);
        const phaseName = firstPhase.get('phaseName');
        if (phaseName) {
          const nameValue = phaseName.value;
          if (typeof nameValue === 'string') {
            const parsedValue = parseInt(nameValue, 10);
            if (!isNaN(parsedValue)) {
              phaseName.setValue(parsedValue);
            }
          }
        }
    
        const phaseHrBudget = firstPhase.get('phaseHrBudget');
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
    }

    if (this.projectform.valid) {
      this.projectService.createProject(this.projectform.value).subscribe(
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
}
