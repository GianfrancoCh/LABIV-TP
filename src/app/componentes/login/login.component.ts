import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import {Firestore,collection,query,addDoc} from "@angular/fire/firestore"
import { RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class LoginComponent{

  loginForm: FormGroup;
  flagError: boolean = false;
  msjError: string = '';
  

  constructor(private router: Router, private fb: FormBuilder, public auth: Auth) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

  autocompletarLogin(){
    this.loginForm.patchValue({
      email: "admin@test.com",
      password: "admin1234"
    });
  }

  // Login() {

  //   const email = this.loginForm.get('email')?.value;
	// 	const password = this.loginForm.get('password')?.value;

  //   if (this.loginForm.invalid) {
      
  //     this.loginForm.markAllAsTouched(); 
  //     return;
  //   }

  //   let col = collection(this.firestore, 'logins');
  //   addDoc(col, { fecha: new Date(), "email": email});

  //   console.log(this.loginForm.value);
  // }

  Login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  
      return;
    }

    const email = this.loginForm.get('email')?.value;  
    const password = this.loginForm.get('password')?.value;  

    signInWithEmailAndPassword(this.auth, email, password)  
      .then((res) => {
        if (res.user.email !== null) {
          this.router.navigate(['/home']);  
        }
      })
      .catch((e) => {
        this.flagError = true; 
        switch (e.code) {
          case 'auth/wrong-password':
            this.msjError = 'Contraseña incorrecta';
            break;
          case 'auth/user-not-found':
            this.msjError = 'Usuario no encontrado';
            break;
          case 'auth/invalid-email':
            this.msjError = 'Email inválido';
            break;
          default:
            this.msjError = e.message; 
            break;
        }
      });
  }

  // CloseSession() {
  //   signOut(this.auth).then(() => {
  //     this.loggedUser = ""; 
  //     console.log("Sesión cerrada");
  //   });
  // }

}
