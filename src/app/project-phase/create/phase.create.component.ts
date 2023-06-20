import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectphasesService } from 'src/app/services/projectphases.service';



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
  idparam:any=0;
  phase:any;
  // @Input() projectId: any;

  constructor(public phaseService: ProjectphasesService, 
    public projectService: ProjectService, 
    public fb: FormBuilder, 
    public router:Router, 
    public activatedRoute:ActivatedRoute,) {}

  ngOnInit():void {
    // console.log("id from create phase->");
    // console.log(this.projectId);

    // this.activatedRoute.params.subscribe((a)=>{
    //   // this.idparam=a['id'];
    //   // console.log("create phase  wih proj id" );
    //   this.projectService.getProjectPhasesByProjectId(a['id'])
    //   .subscribe((phase: any) => {
    //     this.idparam=a;
    //     console.log("id from create phase->");
    //     console.log(this.projectIdInput);
    //     this.phase=phase;
    //     console.log("phase with proj id->");
    //     console.log(this.phase);
    //   });
  
    //   })
  }





  matcher = new MyErrorStateMatcher();

  createProjectphaseForm = this.fb.group({
    phaseName: ['',[Validators.required,],],
    phaseStartDate: ['',[Validators.required,],],
    phaseEndDate: ['', [Validators.required]],
    phaseMilestone: ['', [Validators.required]],
    phaseHrBudget: ['', [Validators.required]],


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
    this.phaseService.createProjectPhase(this.idparam,this.createProjectphaseForm.value,).subscribe(
      (response) => {this.router.navigateByUrl('/projecttask'); console.log(response)},
      (error) => console.log(error)
    );
  }
}
