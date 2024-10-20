import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Firestore, collection, addDoc, query, onSnapshot } from '@angular/fire/firestore';  // Importar Firebase Firestore
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Timestamp, orderBy } from 'firebase/firestore';

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
  currentUserEmail: string | null = null;

  constructor(private authService: AuthService, private firestore: Firestore, private fb: FormBuilder) {
    this.chatForm = this.fb.group({
      mensaje: [''] 
    });
  }
  
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.currentUserEmail = currentUser ? currentUser.email : null;

    const q = query(
      collection(this.firestore, 'mensajes'),
      orderBy('fecha', 'asc') 
    );
  
    onSnapshot(q, (querySnapshot) => {
      this.mensajes = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const fecha = data['fecha'] ? (data['fecha'] as Timestamp).toDate() : new Date();
        this.mensajes.push({
          ...data,
          fecha: fecha.toLocaleString() 
        });
      });
    });
  }

  sendMessage () {

    if (this.chatForm.valid) {
      const mensaje = this.chatForm.get('mensaje')?.value;  
      const currentUser = this.authService.getCurrentUser();

      if (currentUser) {
       
        const fecha = new Date(); 
        addDoc(collection(this.firestore, 'mensajes'), {
          user: currentUser.email,
          mensaje: mensaje,  
          fecha: fecha
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
