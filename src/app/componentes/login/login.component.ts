import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import {Firestore,collection,query,addDoc} from "@angular/fire/firestore"
import { RouterModule, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class LoginComponent {

  loginForm: FormGroup;
  

  constructor(private router: Router, private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: [''],
			password: ['']
		});
	}

  autocompletarLogin(){
    this.loginForm.patchValue({
      email: "test@gmail.com",
      password: "1234hola"
    });
  }

}
