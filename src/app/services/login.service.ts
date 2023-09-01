import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //current user: who is logged in
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/auth/current-user`)
  }

  //generate token

  public generateToken(loginData:any)
  { 
    return this.http.post(`${baseUrl}/auth/login`,loginData)
  }

  //Login user: set token in LocalStorage
  public loginUser(token: string)
  {
    localStorage.setItem('token',token)
   // this.loginStatusSubject.next(true)
    return true;
  }

  //check user is login or not
  public isLockedIn()
  {
    let tokenStr=localStorage.getItem('token')
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false
    }
    else{
      return true
    }
  }

  //logout : remove token from local storage
  public logout()
  {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return true;
  }

  //get token
  public getToken()
  {
    return localStorage.getItem('token')
  }

  //set user detail
  public setUser(user:string)
  {
    localStorage.setItem('user', JSON.stringify(user))
  }

  //get User
  public getUser()
  {
    let userStr=localStorage.getItem("user")
    if(userStr!=null)
    {
      return JSON.parse(userStr)
    }
    else{
      this.logout()
      return null
    }
  }

  //get user role
  public getUserRole()
  {
    let user=this.getUser()
    return user.authorities[0].authority
  }
}
