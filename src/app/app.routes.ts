import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';


export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent},
    { path: 'quien-soy', component: QuienSoyComponent},
    { path : 'chat', component: ChatComponent},
    { path: 'juegos', loadChildren: () => import('./modulo-juegos/juegos.module').then(m => m.JuegosModule) },
    { path: '**', component: PageNotFoundComponent },
    
];

