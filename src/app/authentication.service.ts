import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// The authentication service is used to login & logout of the Angular app, it notifies other components when the user logs in & out, and allows access the currently logged in user.

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private loginUrl = "http://cm.inellipse.com:8088/api/oauth/token";

  constructor(private http: HttpClient, private router: Router) { }

  // For login request we should use POST method.

  // loginUser(user: any) {

  //   // let headers= new HttpHeaders()
  //   // headers .set('content-type', 'application/json')
  //   // headers .set('Authorization', 'basic')
  //   // headers .set('Access-Control-Allow-Origin', '*');
  //   // return this.http.post<any>(this.loginUrl, user, { 'headers': headers });

  //   return this.http.post<any>(this.loginUrl, user);

  // }

  loginUser(user: any) {
    const basicToken =
      'ODI0MjNkNDBjZDQzOGRiMTA2MjAwZjZkY2ZjNmIzMDc1NWNlNTFiNDo2ZTgzYTFiYjU4MDExMTM5YmFjYjcxZGUwNzQwNzZlNzRjNzkwNjY2YTQ4YjFkYTcyZGRjMmYwMjUyNTI=';

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Authorization', `Basic ${basicToken}`);

    let body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
    body.set('grant_type', 'password');

    return this.http.post<any>(this.loginUrl, body.toString(), { headers });
  }

  saveAuthenticationData(token: string) {
    localStorage.setItem('token', token);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
