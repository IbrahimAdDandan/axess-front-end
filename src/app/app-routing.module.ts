import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { PricingComponent } from "./pricing/pricing.component";
import { UserProfileComponent } from "./user-profile/user-profile.component"

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'pricing', component: PricingComponent
  },
  {
    path: 'profile', component: UserProfileComponent
  },
  {
    path: 'security', loadChildren: () => import('./security/security-routing.module').then(m => m.SecurityRoutingModule),
  },
  {
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },
  {
    path: 'groups', loadChildren: () => import('./groups/groups-routing.module').then(m => m.GroupsRoutingModule),
  },
  {
    path: 'rooms', loadChildren: () => import('./rooms/rooms-routing.module').then(m => m.RoomsRoutingModule)
  },
  {
    path: '**', component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
