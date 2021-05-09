import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Address } from 'src/app/models/user.model';
import { LoginService } from '../services/login-service.service';
import { MatPasswordStrengthComponent } from '@angular-material-extensions/password-strength';
import { MatFormField } from "@angular/material/form-field/form-field";
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  user: User;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _auth: LoginService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = new User();
    this.user.address = new Address();
    this.user.languageId = 14;
  }

  formSubmit(ngForm: NgForm) {

    // this._auth
    //   .getSid()
    //   .subscribe(sid => {
    //     console.log(sid);
    //     localStorage.setItem('sid', sid);
    this.user.firstname = ngForm.form.controls['firstname'].value;
    this.user.lastname = ngForm.form.controls['lastname'].value;
    this.user.login = ngForm.form.controls['username'].value;
    this.user.address.email = ngForm.form.controls['username'].value;
    this.user.password = ngForm.form.controls['password'].value;
    this._auth
      .register(this.user)
      .subscribe(res => {

        // console.log("Register Result is: ");
        // console.log(res);
        localStorage.removeItem('sid');
        this._router.navigate(['security']);
      }, err => {
        if (err.status === 401 || err.status === 403) {
          // alert('invalid user ID or password');
          const message = 'ليس مسموحاً لك القيام بهذا';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 2000,
          });
        } else {
          // alert('There is an error occured, please try later.');
          const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });

    // }, er => { });

  }

}
