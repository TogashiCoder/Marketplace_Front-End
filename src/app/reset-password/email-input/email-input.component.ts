import { Component, EventEmitter, Output } from '@angular/core';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';



@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent {

  @Output() otpSent = new EventEmitter<string>();
  email: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private forgotPasswordService: ForgetPasswordService) {}

  sendOtp() {
    this.isLoading = true;
    this.errorMessage = '';
    this.forgotPasswordService.sendOtp(this.email).subscribe(
      response => {
        this.isLoading = false;
        this.otpSent.emit(this.email);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
  }

}
