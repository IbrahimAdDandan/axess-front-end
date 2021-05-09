import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatFormFieldModule } from "@angular/material/form-field";
import {  MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SecurityRoutingModule,
    SharedModule,
    MatPasswordStrengthModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  exports: []
})
export class SecurityModule { }
