import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  loggedUserId;
  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }

  //return boolean if token exists in browser
  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this.loggedUserId = ''
    this._router.navigate(['/'])
  }

  setLoggedUserId(id){
    this.loggedUserId = id;
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
