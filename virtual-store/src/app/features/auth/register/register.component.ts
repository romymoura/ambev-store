import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { UserStatus } from '../../../shared/enums/user-status.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]]
    });
  }

  passwordValidator(control: any) {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return valid ? null : { invalidPassword: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const user = {
      ...this.registerForm.value,
      status: UserStatus.Active,
      role: UserRole.Customer
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login'], { queryParams: { newUser: true } });
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'An error occurred during registration';
      }
    });
  }
}
