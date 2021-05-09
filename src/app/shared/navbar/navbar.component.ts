import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  username: string;
  isLoggedIn: boolean;
  constructor(private _router: Router) { }

  ngOnInit(): void {


  }

  LoggedIn() {
    this.username = localStorage.getItem('username');
    this.isLoggedIn = !!this.username;
    // console.log("userEmail" + this.userEmail);
    return this.isLoggedIn;
  }

  logout() {
    localStorage.clear();
    // localStorage.removeItem('email');
    // localStorage.removeItem('username');
    // localStorage.removeItem('userId');
    this._router.navigate(['/']);
  }

}
