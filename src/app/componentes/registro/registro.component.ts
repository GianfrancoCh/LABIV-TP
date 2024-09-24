import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('User registered:', this.user);
    // Aquí puedes agregar lógica para enviar los datos a tu backend
  }
}
