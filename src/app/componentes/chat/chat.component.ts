import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Firestore, collection, addDoc, query, onSnapshot } from '@angular/fire/firestore';  // Importar Firebase Firestore
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;  
  mensajes: any[] = [];  
  isLoggedIn = false;  

  constructor(private authService: AuthService, private firestore: Firestore, private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      mensaje: [''] 
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedInEmitter.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    const q = query(collection(this.firestore, 'mensajes'));
    onSnapshot(q, (querySnapshot) => {
      this.mensajes = [];
      querySnapshot.forEach((doc) => {
        this.mensajes.push(doc.data());
      });
    });
  }

  sendMessage() {
    
    if (this.chatForm.valid) {
      const mensaje = this.chatForm.get('mensaje')?.value;  
      const currentUser = this.authService.getCurrentUser();

      if (this.isLoggedIn && currentUser) {
       
        const fecha = new Date(); 
        addDoc(collection(this.firestore, 'mensajes'), {
          user: currentUser.email,
          mensaje: mensaje,  
          fecha: fecha.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false  
          })
        }).then(() => {
          this.chatForm.reset();  
        }).catch((error) => {
        });
      } else {
        console.error('El usuario no está logueado o no se pudo obtener el usuario.');
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
