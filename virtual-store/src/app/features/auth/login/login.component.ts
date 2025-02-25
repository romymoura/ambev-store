import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../shared/enums/user-role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;

        if (response.success && response.data.success) {
          // Redirect based on user role
          const userRole = this.authService.getCurrentUserRole();

          if (userRole === UserRole.Customer) {
            this.router.navigate(['/user/list-product']);
          } else if (userRole === UserRole.Admin) {
            this.router.navigate(['/admin/products']);
          } else if (userRole === UserRole.Manager) {
            this.router.navigate(['/manager/users']);
          }
        } else {
          this.errorMessage = response.data.message || 'Authentication failed';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'An error occurred during login';
      }
    });
  }
}
