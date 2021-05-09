import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRoomsComponent } from "./view-rooms/view-rooms.component";

const routes: Routes = [
  {
    path: ':id/view', component: ViewRoomsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
