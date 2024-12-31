import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    NgFor,
    NgIf
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response)
          let token:string = response.token;
          let refreshToken:string = response.refreshToken;
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken)
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
        },
      });
    }
  }

}
