import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

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
  constructor() { }

  ngOnInit(): void {
  }

  // signIn() {
  //   if (this.username == "testuser" && this.password == "testuser001") {
  //     this.router.navigateByUrl("/");
  //   }
  //   else {
  //     alert("Please Enter Valid Username and Password");
  //   }
  // }

}
