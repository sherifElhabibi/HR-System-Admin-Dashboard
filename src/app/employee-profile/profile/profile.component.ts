import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee/employee';
import { GetAllProjects } from 'src/app/models/project/GetAllProjects';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectTaskWithId } from 'src/app/models/ProjectTask/ProjectTaskWithId';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  projects: any;
  tasksForOpenProjects:ProjectTaskWithId[]=[];
  final:ProjectTaskWithId[]=[];
  projectsforemp:GetAllProjects[] = [];
  employeeHiringDate:Date=new Date();
  idparams: any;
  employee: Employee = new Employee(
    0,
    '',
    '',
    0,
    0,
    0,
    0,
    '',
    '',
    '',
    '',
    '',
    0,
    0,
    0,
    undefined,
    undefined
  );

  constructor(
    public empService: EmployeeService,
    public projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((a)=>{
      this.empService.getEmployeeById(a['id']).subscribe(data=>
        {
         
         this.idparams=a;
         this.employeeHiringDate=new Date(data.employeeHiringDate)
         this.employee=data;
         console.log(this.idparams)
         console.log(this.employeeHiringDate)
          console.log(this.employee)
        });
        this.projectService.getAllProjects().subscribe((projects)=>{
          this.projects=projects;
         console.log(this.projects);
         this.projectsforemp = []
         projects.forEach((element:any) => {
           element.employeesInProject.forEach((eleId:any) => {
             if(eleId.employeeId==a['id']){
             this.projectsforemp.push(element);
             }
           });
           

         });
        //  console.log("projectsforemp");
        //  console.log(this.projectsforemp);
         
         this.projectsforemp.forEach((pro:any) => {
          if(pro.projectStatus=='Open'){
         
          this.tasksForOpenProjects=pro.projectTasks;
          // console.log("pro.projectTasks");
          // console.log(pro.projectTasks);
          }
         });
         console.log("tasksForOpenProjects")
         console.log(this.tasksForOpenProjects)
        });
    
        
       })

    }
   showDiv() {
      const divElement = document.getElementById('more');
    
      if (divElement?.style.display=='none') {
        divElement.style.display ='';
      }
      else if(divElement?.style.display==''){
        divElement.style.display ='none';

      }
    }
    
}

