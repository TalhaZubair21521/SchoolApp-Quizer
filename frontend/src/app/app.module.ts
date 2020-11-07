import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AdminsigninComponent } from './adminsignin/adminsignin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerNotRespondingComponent } from './server-not-responding/server-not-responding.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AdminsigninComponent,
    AdminDashboardComponent,
    UserdashboardComponent,
    PageNotFoundComponent,
    ServerNotRespondingComponent,
    NotAuthorizedComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
