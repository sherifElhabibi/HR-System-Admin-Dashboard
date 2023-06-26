import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { navItems } from './_nav';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
 
  public navItems:INavData[]=[];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateNavItems();
  }

  private updateNavItems(): void {
    const userPosition = this.authService.getPostion();

    if (userPosition === 'Admin') {
      this.navItems = navItems.filter(item => this.isAdminNavItem(item.name!));
    } else if (userPosition === 'HR') {
      this.navItems = navItems.filter(item => this.isHRNavItem(item.name!));
    }
    else if (userPosition === 'Accountant') {
      this.navItems = navItems.filter(item => this.isAccountantNavItem(item.name!));
    }
    else if (userPosition === 'Employee') {
      this.navItems = navItems.filter(item => this.isEmpNavItem(item.name!));
    }
  }


  private isAdminNavItem(name: string): boolean {
    return (
      name === 'Components' ||
      name === 'Employees' ||
      name === 'My Profile' ||
      name === 'Departments' ||
      name === 'Projects Tasks' ||
      name === 'Projects Phases' ||
      name === 'Projects' ||
      name === 'Account'
    );
  }
  


  private isHRNavItem(name: string): boolean {
    if (name === 'Dashboard' || name === 'My Profile' || name === 'Account') {
      return true;
    } else if (name === 'Employees') {
        this.filterEmployeesNavItem();
        return true;
    } else if (name === 'Departments') {
        this.filterDepartmentsNavItem();
        return true;
    }
      else if (name === 'Projects') {
        this.filterProjectsNavItem();
        return true;
    }
      else if (name === 'Projects Tasks') {
        this.filterProjectTasksNavItem();
        return true;
    }
      else if (name === 'Projects Phases') {
        this.filterProjectTasksNavItem();
        return true;
    }
    return false;
  }



  private isAccountantNavItem(name: string): boolean {
    if (name === 'Dashboard' || name === 'My Profile' || name === 'Account') {
      return true;
    } else if (name === 'Employees') {
      this.filterEmployeesNavItem();
      return true;
  } else if (name === 'Departments') {
      this.filterDepartmentsNavItem();
      return true;
    }
    else if (name === 'Projects') {
      this.filterProjectsNavItem();
      return true;
    }
    else if (name === 'Projects Tasks') {
      this.filterProjectTasksNavItem();
      return true;
    }
    else if (name === 'Projects Phases') {
      this.filterProjectTasksNavItem();
      return true;
    }
    return false;
  }



  private isEmpNavItem(name: string): boolean {
    if (name === 'Dashboard' || name === 'My Profile' || name === 'Account') {
      return true;
    }  else if (name === 'Employees') {
      this.filterEmployeesNavItem();
      return true;
    } else if (name === 'Departments') {
      this.filterDepartmentsNavItem();
      return true;
    }
    else if (name === 'Projects') {
      this.filterProjectsNavItem();
      return true;
    }
    else if (name === 'Projects Tasks') {
      this.filterProjectTasksNavItem();
      return true;
    }
    else if (name === 'Projects Phases') {
      this.filterProjectPhasesNavItem();
      return true;
    }
    return false;
  }



  private filterEmployeesNavItem(): void {
    const employeesNavItem: INavData = navItems.find(item => item.name === 'Employees')!;
    if (employeesNavItem.children) {
      employeesNavItem.children = employeesNavItem.children.filter(child =>
        child.name !== 'Create' && child.name !== 'Edit');
    }
    this.navItems.push(employeesNavItem);
  }



  private filterDepartmentsNavItem(): void {
    const departmentsNavItem: INavData = navItems.find(item => item.name === 'Departments')!;
    if (departmentsNavItem.children) {
      departmentsNavItem.children = departmentsNavItem.children.filter(child =>
        child.name !== 'Create' && child.name !== 'Edit');
    }
    this.navItems.push(departmentsNavItem);
  }
  

  
  private filterProjectsNavItem(): void {
    const projectsNavItem: INavData = navItems.find(item => item.name === 'Projects')!;
    if (projectsNavItem.children) {
      projectsNavItem.children = projectsNavItem.children.filter(child =>
        child.name !== 'Create' && child.name !== 'Edit');
    }
    this.navItems.push(projectsNavItem);
  }




  private filterProjectTasksNavItem(): void {
    const projectsTasksNavItem: INavData = navItems.find(item => item.name === 'Projects')!;
    if (projectsTasksNavItem.children) {
      projectsTasksNavItem.children = projectsTasksNavItem.children.filter(child =>
        child.name !== 'Create' && child.name !== 'Edit');
    }
    this.navItems.push(projectsTasksNavItem);
  }



  private filterProjectPhasesNavItem(): void {
    const projectsPhasesNavItem: INavData = navItems.find(item => item.name === 'Projects')!;
    if (projectsPhasesNavItem.children) {
      projectsPhasesNavItem.children = projectsPhasesNavItem.children.filter(child =>
        child.name !== 'Create' && child.name !== 'Edit');
    }
    this.navItems.push(projectsPhasesNavItem);
  }

}
