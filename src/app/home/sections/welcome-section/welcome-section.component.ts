import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.sass']
})
export class WelcomeSectionComponent implements OnInit {

  username: string;
  isLoggedIn: boolean;
  calendarUrl: string

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.calendarUrl = environment.calendar;
  }

  goToCalendar() {
    window.location.href = this.calendarUrl;
  }

  goToGroups() {
    window.location.href = environment.groupsUrl;
  }

  LoggedIn() {
    this.username = localStorage.getItem('username');
    this.isLoggedIn = !!this.username;
    // console.log("userEmail" + this.userEmail);
    return this.isLoggedIn;
  }

}
