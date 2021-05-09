import { Component, OnInit } from '@angular/core';
// import {AgmMarker, AgmMap} from '@agm/core';
import { FormGroup } from '@angular/forms';
import { HomeService } from "../../home.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
// import '../../../../assets/smtp.js';
// declare let Email: any;

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styles:[`
  agm-map {
    height: 300px;
  }
`],
  styleUrls: ['./aboutus.component.sass']
})
export class AboutusComponent implements OnInit {


  lat = 31.9539;
  lng = 35.9106;

  complain: string;
  suggestion: string;
  mail: string;
  notice: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private _homeService: HomeService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(form: FormGroup) {
    // const mail = {
    //     Host : 'smtp.ethereal.email',
    //     Username : 'geovany.monahan@ethereal.email',
    //     port: 587,
    //     Password : 'BMzmBdM4ZKrumuDdF6',
    //     To : 'ibrahim.ad.dandan@gmail.com',
    //     From : 'geovany.monahan@ethereal.email',
    //     Subject : 'subject',
    //     Body : `
    //     <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b> <br /> <b>Email: </b><br /> <b>Subject: 
    //     </b><br /> <b>Message:</b> <br /> <br><br> <b>~End of Message.~</b> `,
    //     Action:"Send"
    //     };
    const subject = "Complain From Contact us in Edu Room AXESS!";
    const content = " a Complain: " + this.complain + " a suggestion: " + this.suggestion + " notice: " + this.notice;
    this._homeService
      .sendMail(subject, content, this.mail)
      .subscribe(res => {
        this._snackBar.open('تم الإرسال بنجاح', 'إغلاق', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, err => {
        const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
        const action = 'إغلاق';
        this._snackBar.open(message, action, {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });


  }

}
