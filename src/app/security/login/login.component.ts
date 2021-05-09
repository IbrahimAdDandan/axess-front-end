import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service.service';
import { User } from 'src/app/models/user.model';
import { FormGroup } from '@angular/forms';
import { MatSnackBar,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  user: User;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _auth: LoginService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // if (this._auth.loggedIn()) {
    //   this._router.navigate(['home']);
    // }
  }

  forgotPass(form: FormGroup) {
    this._auth
      .forgotPass(form.value.username)
      .subscribe(res => {
        if (res.serviceResult.type === "SUCCESS") {
          this._snackBar.open('تم تغيير كلمة السر بنجاح، كلمة السر الجديدة في بريدك الإلكتروني', 'إغلاق', {
            duration: 2000,
          });
        } else if (res.serviceResult.type === "ERROR") {
          this._snackBar.open('البريد الإلكتروني خاطئ', 'إغلاق', {
            duration: 2000,
          });
        }
      },
        err => {
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
  }


  formSubmit(form: FormGroup) {
    // console.log("password is: " + form.value.password);
    this._auth
      .login(form.value.username, form.value.password)
      .subscribe(res => {
        // console.log(res);
        if (res.serviceResult.type === "SUCCESS") {
          let result = JSON.parse(res.serviceResult.message);
          // console.log(result);
          
          localStorage.setItem('sid', result.sid);
          localStorage.setItem('userId', result.user_id);
          localStorage.setItem('email', form.value.username);
          // localStorage.setItem('pass', form.value.password);

          this._auth
            .getUserInfo(result.user_id)
            .subscribe(userInfo => {
              // console.log(userInfo);
              this.user = userInfo.userDTO;
              localStorage.setItem('username', this.user.firstname + ' ' + this.user.lastname);
              localStorage.setItem('firstname', this.user.firstname);
              localStorage.setItem('lastname', this.user.lastname);
              localStorage.setItem('login', this.user.login);
              this._router.navigate(['/groups']);
            },
              err => {

              });
        } else if (res.serviceResult.type === "ERROR") {
          // alert an ERROR
          // alert("Bad Credintials");
          this._snackBar.open('كلمة السر أو اسم المستخدم خاطئ', 'إغلاق', {
            duration: 2000,
          });
        }
        // this._auth
        //   .loginToWicket('ibra', form.value.password)
        //   .subscribe(result => {
        //     console.log("the result is: ");

        //     console.log(result);
        //   }, e => {
        //     console.log("the error is: ");

        //     console.log(e)
        //   });


      },
        err => {
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
  }


}
