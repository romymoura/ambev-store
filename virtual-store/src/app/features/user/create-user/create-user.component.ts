import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStatus } from 'src/app/shared/enums/user-status.enum';
import { UserRole } from 'src/app/shared/enums/user-role.enum';
import { UserService } from 'src/app/core/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const values = Object.values(UserRole);
    const keys = Object.keys(UserRole);

    const userData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
      status: UserStatus.Active,
      role: (values.indexOf(UserRole.Customer) + 1)
    };

    this.userService.register(userData).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para o login...';
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
        } else {
          this.errorMessage = response.message || 'Erro ao cadastrar. Tente novamente.';
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Ocorreu um erro. Tente novamente.';
      }
    });
  }
}
