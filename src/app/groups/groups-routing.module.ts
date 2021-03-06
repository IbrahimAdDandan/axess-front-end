import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewGroupsComponent } from "./view-groups/view-groups.component";

const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  {
    path: 'view', component: ViewGroupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
