import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { GroupRoomsComponent } from './group-rooms/group-rooms.component';
import {  MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  declarations: [ViewRoomsComponent, GroupRoomsComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MatSnackBarModule
  ],
  exports: [GroupRoomsComponent]
})
export class RoomsModule { }
