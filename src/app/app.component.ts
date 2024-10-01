import { Component, OnInit} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthService } from './servicios/auth.service';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './componentes/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,RegistroComponent,LoginComponent, CommonModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'rutas';
  isLoggedIn = false;  // Variable para almacenar el estado de autenticación

  constructor(private router: Router, private authService: AuthService) {}  // Inyectar el AuthService

  ngOnInit() {
    // Comprobar si el usuario está logueado
    this.authService.isLoggedInEmitter.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;  // Actualizar el estado de isLoggedIn
    });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;  // Actualizar el estado después de cerrar sesión
      this.router.navigate(['/login']);
    });
  }
}
