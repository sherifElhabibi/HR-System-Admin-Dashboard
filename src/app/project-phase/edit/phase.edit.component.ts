import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectphasesService } from 'src/app/services/projectphases.service';

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
  selector: 'app-phase.edit',
  templateUrl: './phase.edit.component.html',
  styleUrls: ['./phase.edit.component.scss'],
})
export class PhaseEditComponent implements OnInit {
  id!: number;
  constructor(
    public phaseService: ProjectphasesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.phaseService.getPhaseById(this.id).subscribe((data) => {
      this.editPhaseForm.patchValue(data);
    });
  }
  matcher = new MyErrorStateMatcher();

  editPhaseForm = this.fb.group({
    phaseName: [0, [Validators.required]],
    phaseStartDate: ['', [Validators.required]],
    phaseEndDate: [0, [Validators.required]],
    phaseMilestone: ['', [Validators.required]],
    phaseHrBudget: ['', Validators.required],
  });

  getPhaseName() {
    return this.editPhaseForm.get('phaseName');
  }

  getPhaseStartDate() {
    return this.editPhaseForm.get('phaseStartDate');
  }

  getPhaseEndDate() {
    return this.editPhaseForm.get('phaseEndDate');
  }

  getPhaseMilestone() {
    return this.editPhaseForm.get('phaseMilestone');
  }

  getPhaseHrBudgety() {
    return this.editPhaseForm.get('phaseHrBudget');
  }

  display() {
    return console.log(this.editPhaseForm);
  }
  editPhase() {
    this.phaseService
      .editPhase(this.id, this.editPhaseForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('employees/list');
      });
  }
  back() {
    this.router.navigateByUrl('/phases/list');
  }
}
