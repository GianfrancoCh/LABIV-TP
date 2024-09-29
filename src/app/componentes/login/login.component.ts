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
export class LoginComponent {

  loginForm: FormGroup;
  

  constructor(private firestore: Firestore, private router: Router, private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

  autocompletarLogin(){
    this.loginForm.patchValue({
      email: "test@gmail.com",
      password: "1234hola"
    });
  }

  Login() {

    const email = this.loginForm.get('email')?.value;
		const password = this.loginForm.get('password')?.value;

    if (this.loginForm.invalid) {
      
      this.loginForm.markAllAsTouched(); 
      return;
    }

    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), "email": email});

    console.log(this.loginForm.value);
  }

}
