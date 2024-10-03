import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminRegisterService } from 'src/app/services/admin-register.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

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
    private adminRegisterService: AdminRegisterService,
    private router: Router
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
    const adminData = { ...this.registerForm.value, role: 'ADMIN' };
    formData.append('admin', JSON.stringify(adminData));

    if (this.selectedProfileImage) {
      formData.append('profileImage', this.selectedProfileImage);
    }

    this.adminRegisterService.registerAdmin(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          console.log('Admin registered successfully!', response);
          this.showSuccessPopup();
        },
        error: (error) => {
          console.error('Error registering admin:', error);
          this.errorMessage = 'An error occurred while registering. Please try again.';
        }
      });
  }

  showSuccessPopup(): void {
    this.showSuccessMessage = true;
    setTimeout(() => {
      const popup = document.querySelector('.success-popup');
      popup?.classList.add('show', 'animate');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }, 0);
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
