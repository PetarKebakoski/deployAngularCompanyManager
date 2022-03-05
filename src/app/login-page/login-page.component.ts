import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginUserData: any = {};
  errorMessage = "";
  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.authentication.loginUser(this.loginUserData).subscribe(
      (res) => {
        this.authentication.saveAuthenticationData(res.access_token);
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        this.errorMessage = "Wrong username or password"
      }
    );
  }

}
