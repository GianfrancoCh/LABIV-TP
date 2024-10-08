import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, query, addDoc } from "@angular/fire/firestore";
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  flagError: boolean = false;
  msjError: string = '';

  constructor(private router: Router, private fb: FormBuilder, private firestore: Firestore, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  autocompletarLogin() {
    this.loginForm.patchValue({
      email: "admin@test.com",
      password: "admin1234"
    });
  }

  // Método para manejar el login y los errores con SweetAlert
  Login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  
      return;
    }

    const email = this.loginForm.get('email')?.value;  
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password)
      .then(() => {
        let col = collection(this.firestore, 'logins');
        addDoc(col, { fecha: new Date(), "email": email });

        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Bienvenid@!',
          text: 'Has iniciado sesión correctamente',
          icon: 'success',
          customClass: {
            popup: 'alert-popup',
            title: 'alert-titulo',
            confirmButton: 'alert-boton'
          }
          
        }).then(() => {
          this.router.navigate(['/home']);  // Redirigir después del login exitoso
        });
      })
      .catch((e) => {
        let errorMsg = '';

        switch (e.code) {
          case 'auth/wrong-password':
            errorMsg = 'Contraseña incorrecta';
            break;
          case 'auth/invalid-credential':
            errorMsg = 'Credenciales inválidas';
            break;
          case 'auth/user-not-found':
            errorMsg = 'Usuario no encontrado';
            break;
          case 'auth/invalid-email':
            errorMsg = 'Email inválido';
            break;
          default:
            errorMsg = e.message;
            break;
        }

        // Mostrar error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error de Login',
          text: errorMsg,
          customClass: {
            popup: 'alert-popup',
            title: 'alert-titulo-error',
            confirmButton: 'alert-boton'
          }
        });
      });
  }
}
