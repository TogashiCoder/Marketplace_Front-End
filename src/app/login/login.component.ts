import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  loginError: string | null = null;
  loginForm: FormGroup;
  showPassword: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    this.authService.logout();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }




  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          console.log('Login successful', response);

          // Get the user role
          const role = this.authService.getUserRole();
          console.log('Role is: ' + role);
          console.log('ID is: ' + this.authService.getUserIdFromJwt());

          // Redirect based on role
          if (role === 'ADMIN' || role === 'SELLER') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'BUYER') {
            // this.router.navigate(['/shop/Shop-List']);
            this.router.navigate(['']);

          } else {
            console.error('Unknown role: ' + role);
          }
        },
        error => {
          console.error('Login failed', error);
          this.loginError = 'Invalid username or password';
        }
      );
    }
  }




  getRole():string{
    return  this.authService.getUserRole()
  }


}
