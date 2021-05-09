import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from "../services/room.service";
import { environment } from "../../../environments/environment.prod";
import { Room } from 'src/app/models/room.model';
import { LoginService } from "../../security/services/login-service.service";
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/appointment.model';
import { Router } from '@angular/router';


@Component({
  selector: 'group-rooms',
  templateUrl: './group-rooms.component.html',
  styleUrls: ['./group-rooms.component.sass']
})
export class GroupRoomsComponent implements OnInit {

  @Input() groupId: number;
  rooms: Room[];
  invit: Appointment[];
  firstTime: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _roomService: RoomService, private _authService: LoginService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {

    this.firstTime = true;

    // this._roomService
    //   .get(this.groupId)
    //   .subscribe(res => {
    //     this.rooms = res.roomDTO;
    //     console.log(this.rooms);
    //   },
    //     err => {
    //       if (err.status === 401 || err.status === 403) {
    //         // alert('invalid user ID or password');
    //         const message = 'ليس مسموحاً لك القيام بهذا';
    //         const action = 'إغلاق';
    //         this._snackBar.open(message, action, {
    //           duration: 2000,
    //         });
    //       } else {
    //         // alert('There is an error occured, please try later.');
    //         const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
    //         const action = 'إغلاق';
    //         this._snackBar.open(message, action, {
    //           duration: 4000,
    //           horizontalPosition: this.horizontalPosition,
    //           verticalPosition: this.verticalPosition,
    //         });
    //       }
    //     });

    this._roomService
      .getAppointments(this.groupId)
      .subscribe(res => {
        this.invit = res.appointmentDTO;
        // console.log(this.rooms);
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

  enterRoom(roomId) {

    if (!this.firstTime) {
      const message = 'لا يمكن الدخول ﻷكثر من غرفة بنفس الوقت، يرجى إغلاق الغرفة السابقة وإعادة تسجيل الدخول';
      const action = 'إغلاق';
      this._snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      setTimeout(() => {
        localStorage.clear();
        this._router.navigate(['/security/login']);
      }, 3000);
      //   // alert("not first time");
      //   localStorage.removeItem('sid');
      //   this._authService
      //     .getSid()
      //     .subscribe(res => {
      //       if (res) {
      //         console.log("sid is: ");
      //         console.log(res);

      //         localStorage.setItem('sid', res);
      //         this.firstTime = false;
      //         // get hash
      //         this.callRoomService(roomId);
      //       }
      //     }, err => { if (err.status === 401 || err.status === 403) {
      //       // alert('invalid user ID or password');
      //       const message = 'ليس مسموحاً لك القيام بهذا';
      //       const action = 'إغلاق';
      //       this._snackBar.open(message, action, {
      //         duration: 2000,
      //       });
      //     } else {
      //       // alert('There is an error occured, please try later.');
      //       const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
      //       const action = 'إغلاق';
      //       this._snackBar.open(message, action, {
      //         duration: 4000,
      //         horizontalPosition: this.horizontalPosition,
      //         verticalPosition: this.verticalPosition,
      //       });
      //     }
      //   });
    } else {
      this.firstTime = false;
      // get hash
      this.callRoomService(roomId);
    }



  } // end of enter room function


  callRoomService(roomId) {
    this._roomService
      .getRoomHash(roomId)
      .subscribe(res => {

        // console.log(res);
        // debugger;
        if (res.serviceResult.type === 'SUCCESS') {
          const message = 'تمت العملية بنجاح';
          const action = 'إغلاق';
          this._snackBar.open(message, action, {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          localStorage.setItem('roomHash', res.serviceResult.message);
          const _link = environment.roomLink + res.serviceResult.message;
          window.open(_link, '_blank');
        }
        // got o the link

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
            // const message = 'حدث خطأ ما، يرجى المحاولة لاحقاً';
            // const action = 'إغلاق';
            // this._snackBar.open(message, action, {
            //   duration: 4000,
            //   horizontalPosition: this.horizontalPosition,
            //   verticalPosition: this.verticalPosition,
            // });
          }
        });
  }


}
