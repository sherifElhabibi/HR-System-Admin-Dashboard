import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee/employee';
import { GetAllProjects } from 'src/app/models/project/GetAllProjects';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectTaskWithId } from 'src/app/models/ProjectTask/ProjectTaskWithId';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  projects: any;
  tasksForOpenProjects: ProjectTaskWithId[] = [];
  final: ProjectTaskWithId[] = [];
  projectsforemp: GetAllProjects[] = [];
  employeeHiringDate: Date = new Date();
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
    private empService: EmployeeService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const employeeId = sessionStorage.getItem('userId');
    const employeeID = Number(JSON.parse(employeeId!));
    if (employeeID) {
      this.activatedRoute.params.subscribe((params) => {

        const idparams = employeeID; 

        this.empService.getEmployeeById(employeeID).subscribe((data) => {

          this.idparams = idparams;
          this.employeeHiringDate = new Date(data.employeeHiringDate);
          this.employee = data;
          console.log(this.idparams);
          console.log(this.employeeHiringDate);
          console.log(this.employee);
          
        });

        this.projectService.getAllProjects().subscribe((projects) => {
          this.projects = projects;
          console.log(this.projects);
          this.projectsforemp = [];

          projects.forEach((element: any) => {
            element.employeesInProject.forEach((eleId: any) => {
              if (eleId.employeeId == employeeID) {
                this.projectsforemp.push(element);
              }
            });
          });

          this.projectsforemp.forEach((pro: any) => {
            if (pro.projectStatus == 'Open') {
              this.tasksForOpenProjects = pro.projectTasks;
            }
          });

          console.log('tasksForOpenProjects');
          console.log(this.tasksForOpenProjects);
        });
      });
    }
  }

  showDiv() {
    const divElement = document.getElementById('more');

    if (divElement?.style.display == 'none') {
      divElement.style.display = '';
    } else if (divElement?.style.display == '') {
      divElement.style.display = 'none';
    }
  }
  signOut(){
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }
}
