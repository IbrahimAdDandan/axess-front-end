import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Address, User } from '../models/user.model';
import { LoginService } from "../security/services/login-service.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  user: User;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _auth: LoginService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = new User();
    this.user.address = new Address();
    this._auth
      .getUserInfo(localStorage.getItem('userId'))
      .subscribe(userInfo => {
        // console.log(userInfo);
        this.user = userInfo.userDTO;
      },
        err => {
          const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
  }


  formSubmit(ngForm: NgForm) {
    let firstname = ngForm.form.controls['firstname'].value;
    let lastname = ngForm.form.controls['lastname'].value;
    let login = ngForm.form.controls['username'].value;
    let email = ngForm.form.controls['username'].value;

    this.user.firstname = (!!firstname || firstname !== '')? firstname : this.user.firstname;
    this.user.lastname = (!!lastname || lastname !== '')? lastname : this.user.lastname;
    this.user.login = (!!email || email !== '')? email : this.user.login;
    this.user.address.email = (!!email || email !== '')? email : this.user.address.email;
    
    this._auth
      .updateProfile(this.user)
      .subscribe(res => {
          this._snackBar.open('تم تحديث البيانات بنجاح، سيتم تطبيق التغييرات في تسجيل الدخول التالي', 'إغلاق', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      }, err => {
        if (err.status === 401 || err.status === 403) {
          const message = 'ليس مسموحاً لك القيام بهذا';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
  }

  form1Submit(ngForm1: NgForm) {
    let password = ngForm1.form.controls['password'].value;
    debugger;
    this._auth
      .changePass(password)
      .subscribe(res => {
        if (res.serviceResult.type === "SUCCESS") {
          this._snackBar.open('تم تغيير كلمة السر', 'إغلاق', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else if (res.serviceResult.type === "ERROR") {
          this._snackBar.open('ليس لديك الصلاحية لتغيير كلمة السر لك أو لشخص آخر', 'إغلاق', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }, err => {
        if (err.status === 401 || err.status === 403) {
          const message = 'ليس مسموحاً لك القيام بهذا';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
          const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      });
  }

}
