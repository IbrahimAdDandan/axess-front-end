import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { InterceptorInterceptor } from "../interceptor.interceptor";

import { GroupsRoutingModule } from './groups-routing.module';
import { ViewGroupsComponent } from './view-groups/view-groups.component';
import { SharedModule } from "../shared/shared.module";
import { RoomsModule } from "../rooms/rooms.module";
import {  MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";


@NgModule({
  declarations: [ViewGroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule,
    RoomsModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: InterceptorInterceptor,
  //   multi: true
  // }]
})
export class GroupsModule { }
