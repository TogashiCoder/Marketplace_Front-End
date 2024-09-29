import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  currentStep: 'email' | 'otp' | 'reset' | 'success' = 'email';
 email: string = '';

  onOtpSent(email: string) {
    this.email = email;
    this.currentStep = 'otp';
  }

  onOtpVerified() {
    this.currentStep = 'reset';
  }

  onOtpExpired() {
    this.currentStep = 'email';
  }

  onPasswordReset() {
    this.currentStep = 'success';
  }
}
