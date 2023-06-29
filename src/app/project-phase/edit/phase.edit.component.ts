import { DatePipe } from '@angular/common';
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
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.phaseService.getPhaseById(this.id).subscribe((phase) => {
      this.editPhaseForm.patchValue({
        phaseName: phase.phaseName,
        phaseStartDate: phase.phaseStartDate,
        phaseEndDate: phase.phaseEndDate,
        phaseMilestone: phase.phaseMilestone,
        phaseHrBudget: phase.phaseHrBudget,
      });
    });
  }
  matcher = new MyErrorStateMatcher();

  editPhaseForm = this.fb.group({
    phaseName: [0, [Validators.required]],
    phaseStartDate: ['', [Validators.required]],
    phaseEndDate: ['', [Validators.required]],
    phaseMilestone: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]*$')]],
    phaseHrBudget: [0, Validators.required, Validators.pattern('^[0-9]+$')],
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
    return console.log(this.editPhaseForm.value);
  }
  editPhase() {
    this.editPhaseForm.value.phaseStartDate = this.datePipe.transform(
      this.editPhaseForm.value.phaseStartDate,
      'yyyy-MM-dd'
    );
    this.editPhaseForm.value.phaseEndDate = this.datePipe.transform(
      this.editPhaseForm.value.phaseEndDate,
      'yyyy-MM-dd'
    );

    if (this.editPhaseForm) {
      const phaseHrBudget = this.editPhaseForm.get('phaseHrBudget');
      if (phaseHrBudget) {
        const hrBudgetValue = phaseHrBudget.value;
        if (typeof hrBudgetValue === 'string') {
          const parsedValue = parseFloat(hrBudgetValue);
          if (!isNaN(parsedValue)) {
            phaseHrBudget.setValue(parsedValue);
          }
        }
      }
    }
    const phaseName = this.editPhaseForm.get('phaseName');
      if (phaseName) {
        const phaseNameValue = phaseName.value;
        if (typeof phaseNameValue === 'string') {
          const parsedValue = parseInt(phaseNameValue, 10);
          if (!isNaN(parsedValue)) {
            phaseName.setValue(parsedValue);
          }
        }
      }
    this.display();
    this.phaseService
      .editPhase(this.id, this.editPhaseForm.value)
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
            })
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
  }
  back() {
    this.router.navigateByUrl('/phases/list');
  }
}
