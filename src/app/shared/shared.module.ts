import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [NavbarComponent, FooterComponent]
})
export class SharedModule { }
