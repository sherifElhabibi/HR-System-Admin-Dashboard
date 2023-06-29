import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/Login/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginnComponent {
  token: any;
  decodedData:any;
  id: any;
  error = '';
  jwtHelper: JwtHelperService = new JwtHelperService();
  
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router){}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]});

    getEmail() {
      return this.loginForm.get('email');
    }

    getPassword() {
      return this.loginForm.get('password');
    }
    
    onSubmit() {
      const { email, password } = this.loginForm.value;
      let user = new User(email, password);
      console.log(user);
      this.authService.loginUser(user).subscribe(
        (data) => {
        console.log(data.data.token);
          this.token = data.data.token;
          this.decodedData = this.jwtHelper.decodeToken(this.token);
          console.log(this.decodedData)
          if (this.token) {
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('userId', JSON.stringify(this.decodedData.Id));
            sessionStorage.setItem('role', JSON.stringify(this.decodedData.Position));
            
            switch (this.decodedData.Position) {
                 case 'Admin':
                     this.router.navigateByUrl('/dashboard');
                     break;
                 case 'HR':
                    this.router.navigateByUrl('/employeeProfil/profile/'+this.decodedData.Id);
                    break;
                 case 'Accountant':
                    this.router.navigateByUrl('/employeeProfil/profile/'+this.decodedData.Id);
                    break;
                 case 'Employee':
                   this.router.navigateByUrl('/employeeProfil/profile/'+this.decodedData.Id);
                   break;
                 default:
                this.router.navigateByUrl('/Home');
                break;
            }
          }
        },
        (error) => {
          this.error = error;
        }
      );
    }    
}
