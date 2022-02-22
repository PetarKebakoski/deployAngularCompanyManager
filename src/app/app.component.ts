import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-company-manager';
  showMenu: boolean = false;
  constructor(private router: Router, public authentication: AuthenticationService) {
    
    // Hide the Navigation Bar in the login page. 
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showMenu = event.url !== "/login"
      }
    });
  }
}
