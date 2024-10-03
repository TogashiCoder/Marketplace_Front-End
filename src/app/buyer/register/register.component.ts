import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuyerRegisterService } from 'src/app/services/buyer-register.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showSuccessMessage = false;
  selectedProfileImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private buyerRegisterService: BuyerRegisterService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedProfileImage = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    const buyerData = { ...this.registerForm.value, role: 'BUYER' };
    formData.append('buyer', JSON.stringify(buyerData));

    if (this.selectedProfileImage) {
      formData.append('profileImage', this.selectedProfileImage);
    }

    this.buyerRegisterService.registerBuyer(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          console.log('Buyer registered successfully!', response);
          this.showSuccessMessage = true;
          this.registerForm.reset();
          this.selectedProfileImage = null;

          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error registering buyer:', error);
          this.errorMessage = 'An error occurred while registering. Please try again.';
        }
      });
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
