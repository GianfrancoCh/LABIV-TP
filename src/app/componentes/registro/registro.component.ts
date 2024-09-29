import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup; 
  loggedUser: string = '';  
  flagError: boolean = false;  
  msjError: string = '';

  constructor(private fb: FormBuilder, public auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required]],  
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

 
  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();  
      return;
    }

    const email = this.registroForm.get('email')?.value; 
    const password = this.registroForm.get('password')?.value; 

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        if (res.user.email !== null) {
          this.loggedUser = res.user.email;
          this.flagError = false;  

  
          this.router.navigate(['/home']);
        }
      })
      .catch((e) => {
        this.flagError = true;  
        switch (e.code) {
          case 'auth/invalid-email':
            this.msjError = 'Email inválido';
            break;
          case 'auth/email-already-in-use':
            this.msjError = 'Email ya está en uso';
            break;
          default:
            this.msjError = e.message;  
            break;
        }
      });
  }

 
  get username() {
    return this.registroForm.get('username');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }
}
