import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from "../services/group.service";
import { Group } from 'src/app/models/group.model';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { interval } from 'rxjs';


@Component({
  selector: 'app-view-groups',
  templateUrl: './view-groups.component.html',
  styleUrls: ['./view-groups.component.sass']
})
export class ViewGroupsComponent implements OnInit, OnDestroy{

  groups: Group[];
  otherGroups: Group[];
  myGroups: Group[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  timerInterval:any;

  constructor(private _groupService: GroupService, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.otherGroups = new Array();
    this.groups = new Array();
    this.myGroups = new Array();

    this._groupService
      .get()
      .subscribe(res => {

        this.groups = res.groupDTO.filter((v, i) => {
          v.name !== null;
        });
        console.log("groups:");
        console.log(this.groups);

        this._groupService
          .getUserGroups(+localStorage.getItem('userId'))
          .subscribe(res => {
            console.log("my groups: ");
            console.log(res);

            this.myGroups = res.groupDTO;
            // debugger;
            this.groups.forEach((group, index) => {
                if (group && group.name && !this.found(group)) {
                  this.otherGroups.push(group);
                }
            });
            console.log(this.otherGroups);

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
      },
        err => {
          if (err.status === 401 || err.status === 403) {
            const message = 'ليس مسموحاً لك القيام بهذا';
            const action = 'إغلاق';
            this._snackBar.open(message, action, {
              duration: 4000,
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

        this.timerInterval = setInterval(() => {

          this._groupService
          .getUserGroups(+localStorage.getItem('userId'))
          .subscribe(res => {
            console.log("my groups: ");
            console.log(res);

            this.myGroups = res.groupDTO;
            // debugger;
            this.groups.forEach((group, index) => {
                if (group && group.name &&  !this.found(group) ) {
                  this.otherGroups.push(group);
                }
            });
            console.log(this.otherGroups);

          },
            err => {});
        },30000);


        // interval(1000).subscribe(x => {
          
        //   });

    // this._groupService
    //   .getOtherGroups(+localStorage.getItem('userId'))
    //   .subscribe(res => {
    //     this.otherGroups = res;
    //   },
    //     err => {
    //       if (err.status === 401 || err.status === 403) {
    //         alert('please re-login');
    //       } else {
    //         alert('There is an error occured, please try later.');
    //       }
    //     });



  } // end of ngInit




  private found(group: Group): boolean {
    for(let i = 0; i < this.myGroups.length; i++){
      if (group.id === this.myGroups[i].id) {
        return true;
      }
    };
    return false;
  }


  join(groupId) {
    this._groupService
      .joinGroup(groupId)
      .subscribe(res => {
        console.log("join group result is: " + res);
        console.log(res);

        this.myGroups.push(this.otherGroups.filter(value => value.id === groupId)[0]);
        this.otherGroups = this.otherGroups.filter(value => value.id !== groupId);
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

  }


  LoggedIn() {
    return !!localStorage.getItem('sid');
  }

  ngOnDestroy(){
    clearInterval(this.timerInterval);
  }

}
