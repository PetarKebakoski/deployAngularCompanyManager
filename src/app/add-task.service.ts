import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AddTaskService {

  baseUrl = "http://cm.inellipse.com:8088/api/user/tasks";
  // authentication: any;

  constructor(private http: HttpClient, private authentication: AuthenticationService) { }

  // Post API Method | http post call.

  // postData(body: any) {
  //   return this.http.post(this.baseUrl, body);
  // }

  postData(body: any) {
    const token = this.authentication.getToken();

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    headers = headers.set('Content-type', 'application/json');

    return this.http.post(this.baseUrl, body, { headers });
  }


}
