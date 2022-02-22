import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AddTaskService {

  baseUrl = "http://cm.inellipse.com:8088/api/projects";

  constructor(private http: HttpClient) { }

  // Post API Method | http post call.

  postData(body: any) {
    return this.http.post(this.baseUrl, body);
  }

}
