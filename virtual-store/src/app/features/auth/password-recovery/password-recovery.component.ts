import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.recoveryForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.recoverPassword(this.recoveryForm.value.email).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          this.successMessage = 'Um e-mail com instruções para recuperação de senha foi enviado para você. Redirecionando para tela de login em 5 segundo...';
          this.recoveryForm.reset();
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 5000);
        } else {
          this.errorMessage = response.message || 'Erro ao processar a solicitação.';
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error.message || 'Ocorreu um erro. Tente novamente.';
      }
    });
  }
}
