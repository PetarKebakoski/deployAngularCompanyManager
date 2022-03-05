import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AddTaskService {

  baseUrl = "http://cm.inellipse.com:8088/api/user/tasks";
  projectsUrl = "http://cm.inellipse.com:8088/api/projects";
  tasksUrl = "http://cm.inellipse.com:8088/api/user/tasks/search?page=0&size=60";
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

  getProjects() {
    const token = this.authentication.getToken();

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    headers = headers.set('Content-type', 'application/json');

    return this.http.get(this.projectsUrl, { headers });
  }

  getTasks() {
    const token = this.authentication.getToken();

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    headers = headers.set('Content-type', 'application/json');

    return this.http.post(this.tasksUrl, {}, { headers });
  }


}
