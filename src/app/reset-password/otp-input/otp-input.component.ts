import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css']
})
export class OtpInputComponent {
  @Input() email: string = '';
  @Output() otpVerified = new EventEmitter<void>();
  @Output() otpExpired = new EventEmitter<void>();

  otp: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  remainingTime: number = 300; // 5 minutes
  private timerSubscription: Subscription | null = null;

  constructor(private forgotPasswordService: ForgetPasswordService) {}

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  verifyOtp() {
    this.isLoading = true;
    this.errorMessage = '';
    this.forgotPasswordService.verifyOtp(this.email, this.otp).subscribe(
      response => {
        this.isLoading = false;
        this.otpVerified.emit();
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
  }

  private startTimer() {
    this.timerSubscription = interval(1000)
      .pipe(take(this.remainingTime))
      .subscribe(() => {
        this.remainingTime--;
        if (this.remainingTime === 0) {
          this.otpExpired.emit();
        }
      });
  }

  private stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}

