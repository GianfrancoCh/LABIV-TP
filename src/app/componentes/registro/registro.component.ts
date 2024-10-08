import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';  // Importa SweetAlert

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required]],  
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  // Método para manejar el registro y los errores con SweetAlert
  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();  
      return;
    }

    const email = this.registroForm.get('email')?.value; 
    const password = this.registroForm.get('password')?.value; 

    // Usamos el AuthService para manejar el registro
    this.authService.registro(email, password)
      .then(() => {
        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Bienvenid@!',
          text: 'Registro exitoso',
          icon: 'success',
          customClass: {
            popup: 'alert-popup',
            title: 'alert-titulo',
            confirmButton: 'alert-boton'
          }
        }).then(() => {
          this.router.navigate(['/home']);  // Redirigir después del registro exitoso
        });
      })
      .catch((e) => {
        let errorMsg = '';

        switch (e.code) {
          case 'auth/invalid-email':
            errorMsg = 'Email inválido';
            break;
          case 'auth/email-already-in-use':
            errorMsg = 'Email ya está en uso';
            break;
          case 'auth/weak-password':
            errorMsg = 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
            break;
          default:
            errorMsg = e.message;  
            break;
        }

        // Mostrar error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error de Registro',
          text: errorMsg,
          customClass: {
            popup: 'alert-popup',
            title: 'alert-titulo-error',
            confirmButton: 'alert-boton'
          }
        });
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
