import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SharedModule } from './shared/shared.module';
import { SecurityModule } from "./security/security.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { GroupsModule } from "./groups/groups.module";
import { RoomsModule } from "./rooms/rooms.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from "./interceptor.interceptor";
import { AuthGuardGuard } from './auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WelcomeSectionComponent } from './home/sections/welcome-section/welcome-section.component';
import { ServicesSectionComponent } from './home/sections/services-section/services-section.component';
import { AboutusComponent } from './home/sections/aboutus/aboutus.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { AgmCoreModule } from '@agm/core';
import { PricingComponent } from './pricing/pricing.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { WhoWeAreComponent } from './home/sections/who-we-are/who-we-are.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    WelcomeSectionComponent,
    ServicesSectionComponent,
    AboutusComponent,
    PricingComponent,
    UserProfileComponent,
    WhoWeAreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    SecurityModule,
    DashboardModule,
    GroupsModule,
    RoomsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSlideToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg'
    }),
    MatFormFieldModule,
    MatPasswordStrengthModule
  ],
  providers: [AuthGuardGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
