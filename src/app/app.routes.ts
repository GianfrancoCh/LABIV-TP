import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { RankingComponent } from './componentes/ranking/ranking.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent},
    { path: 'quien-soy', component: QuienSoyComponent},
    { path : 'chat', component: ChatComponent},
    { path : 'encuesta', component: EncuestaComponent},
    {path : 'ranking', component: RankingComponent},
    { path: 'juegos', loadChildren: () => import('./modulo-juegos/juegos.module').then(m => m.JuegosModule) },
    { path: '**', component: PageNotFoundComponent },
    
];

