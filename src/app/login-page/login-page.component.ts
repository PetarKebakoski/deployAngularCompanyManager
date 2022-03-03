import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  // alert: boolean = false;
  // username: string;
  // password: string;
  // constructor(private router: Router) { }

  loginUserData: any = {}
  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  // loginUser() - Call the service passing the user data which is the login user data. 
  // loginUser() {
  //   this.authentication.loginUser(this.loginUserData)
  //     .subscribe(
  //       // res => console.log(res),
  //       // err => console.log(err)
  //     )
  //     this.router.navigateByUrl("/");
  // }

  loginUser() {
    this.authentication.loginUser(this.loginUserData).subscribe(
      (res) => {
        this.authentication.saveAuthenticationData(res.access_token);
      },
      (err) => console.log(err)
    );
    this.router.navigateByUrl('/');
  }


  // signIn() {
  //   if (this.username == "test001" && this.password == "testuser001") {
  //     this.router.navigateByUrl("/");
  //   }
  //   else {
  //     alert("Please Enter Valid Username and Password");
  //   }
  // }

}
