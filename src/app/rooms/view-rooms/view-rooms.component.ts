import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RoomService } from "../services/room.service";
import { environment } from "../../../environments/environment.prod";
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.sass']
})
export class ViewRoomsComponent implements OnInit {

  groupId: string;
  rooms: any[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _route: ActivatedRoute, private _roomService: RoomService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.groupId = this._route.snapshot.paramMap.get("id");

    this._roomService
      .get(this.groupId)
      .subscribe(res => {
          this.rooms = res.roomDTO;
          console.log(this.rooms);
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
    // alert(roomId);

    // get hash
    this._roomService
    .getRoomHash(roomId)
    .subscribe(res => {
      
      // console.log(res);
      // debugger;
      if(res.serviceResult.type === 'SUCCESS') {
        const message = 'تمت العملية بنجاح';
              const action = 'إغلاق';
              this._snackBar.open(message, action, {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
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
