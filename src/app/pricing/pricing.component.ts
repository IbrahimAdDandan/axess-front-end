import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment.prod";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.sass']
})
export class PricingComponent implements OnInit {

  annual: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  goToRegister() {
    window.location.href = environment.origin + 'openmeetings/signin';
  }

}
