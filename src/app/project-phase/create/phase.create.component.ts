import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectphasesService } from 'src/app/services/projectphases.service';
import Swal from 'sweetalert2';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-phase.create',
  templateUrl: './phase.create.component.html',
  styleUrls: ['./phase.create.component.scss']
})
export class PhaseCreateComponent {
  idparam: any = 0;
  phase: any;
  
  constructor(public phaseService: ProjectphasesService,
    public projectService: ProjectService,
    public fb: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,) { }

  matcher = new MyErrorStateMatcher();

  createProjectphaseForm = this.fb.group({
    phaseName: ['', [Validators.required,],],
    phaseStartDate: ['', [Validators.required,],],
    phaseEndDate: ['', [Validators.required]],
    phaseMilestone: ['', [
      Validators.required, 
      Validators.pattern('^[a-zA-Z0-9\\s]*$')
    ]],
    phaseHrBudget: ['', [
      Validators.required,
       Validators.pattern('^[0-9]+$')]],
  });
  getphaseName() {
    return this.createProjectphaseForm.get('phaseName');
  }
  getphaseStartDate() {
    return this.createProjectphaseForm.get('phaseStartDate');
  }
  getphaseEndDate() {
    return this.createProjectphaseForm.get('phaseEndDate');
  }
  getphaseMilestone() {
    return this.createProjectphaseForm.get('phaseMilestone');
  }
  getphaseHrBudget() {
    return this.createProjectphaseForm.get('phaseHrBudget');
  }

  createProjectphase(): void {
    this.phaseService.createProjectPhase(this.idparam, this.createProjectphaseForm.value,).subscribe(
      (response) => { this.router.navigateByUrl('/projecttask'); },
      (error) => {
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
              title: 'Oops...',
              text: 'Something went wrong!',
              showConfirmButton: false,
            })
       }
      }
    );
  }
}
