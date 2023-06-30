import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
isLoggin:boolean=false;
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService, public router: Router,public authService:AuthService) {
    super();
    this.isLoggin = this.authService.isLoggedIn();
    console.log(this.isLoggin)
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
              setTimeout(() => {
                if (this.router.url === '/login') {
                  window.location.reload();
                }
              }, 2);
  }
  account(){
    this.router.navigate(['/employeeProfil/profile/'+this.authService.getID()]);
  }
  
}
