import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class UserSignupService {

  constructor(private httpClient:HttpClient) { }
  LoginStatus:boolean=false;
  LoginData:User;
  
    saveUserSignupDetails(data){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.httpClient.post("http://localhost:4300/api/signup",data, httpOptions);
    }
    userLogin(data){
      const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
      return this.httpClient.post("http://localhost:4300/api/login",data, httpOptions);
  }
}
export interface User{
  username:string,
  password: string,
  email: string,
  mobile: string,
  created:string,
}