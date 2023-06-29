import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/Login/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl=environment.baseApi;
  token: any;
  decodedToken: any;
  helper = new JwtHelperService()

  constructor(private HttpClient:HttpClient) { }

  loginUser(user:User){
    return this.HttpClient.post<any>(this.baseUrl +'/Account/Login',user);
  }

  logOut(){
    sessionStorage.removeItem('token');
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != null;
  }

  getPostion() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.Position;
  }

  getID() {
    this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
    this.decodedToken = this.helper.decodeToken(this.token);
    return this.decodedToken.Id;
  }

  getToken() {
    return this.token = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token')?.toString() : '';
  }
}
