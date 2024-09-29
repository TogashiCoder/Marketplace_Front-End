import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { EmailInputComponent } from './email-input/email-input.component';
import { OtpInputComponent } from './otp-input/otp-input.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component';  


@NgModule({
  declarations: [
    ResetPasswordComponent,
    EmailInputComponent,
    OtpInputComponent,
    ForgotPasswordComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResetPasswordModule { }
