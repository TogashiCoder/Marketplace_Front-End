import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  @Input() email: string = '';
  @Output() passwordReset = new EventEmitter<void>();

  newPassword: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private forgotPasswordService: ForgetPasswordService, private router: Router) {} // Inject Router

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.forgotPasswordService.resetPassword(this.email, this.newPassword).subscribe(
      response => {
        this.isLoading = false;
        this.passwordReset.emit();

        // Wait for 3 seconds and then redirect to the login page
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
  }
}
