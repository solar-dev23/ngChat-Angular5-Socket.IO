import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { NgxAutoScrollModule } from "ngx-auto-scroll";

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
    ResetPasswordComponent,
    SidebarComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
  	RouterModule,
  	FormsModule,
  	ReactiveFormsModule,
    PasswordStrengthBarModule,
    NgxAutoScrollModule,

  	SharedModule
  ],
  providers: [],
  exports: [
  ]
})
export class FeaturesModule {}
