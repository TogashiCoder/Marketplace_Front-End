import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { SellerService } from 'src/app/services/seller.service';

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
  selectedCoverImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private sellerService:SellerService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['',Validators.required],
      country: ['', Validators.required]
    });
  }

  onFileChange(event: Event, type: 'profile' | 'cover'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (type === 'profile') {
        this.selectedProfileImage = input.files[0];
      } else {
        this.selectedCoverImage = input.files[0];
      }
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
    const sellerData = { ...this.registerForm.value, role: 'SELLER' };
    formData.append('seller', JSON.stringify(sellerData));

    if (this.selectedProfileImage) {
      formData.append('profileImage', this.selectedProfileImage);
    }
    if (this.selectedCoverImage) {
      formData.append('coverImage', this.selectedCoverImage);
    }

    this.sellerService.registerSeller(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          console.log('Seller registered successfully!', response);
          this.showSuccessMessage = true;
          this.registerForm.reset();
          this.selectedProfileImage = null;
          this.selectedCoverImage = null;
          setTimeout(() => (this.showSuccessMessage = false), 5000);
        },
        error: (error) => {
          console.error('Error registering seller:', error);
          this.errorMessage = 'An error occurred while registering. Please try again.';
        }
      });
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
