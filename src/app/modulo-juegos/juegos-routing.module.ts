import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../componentes/juegos/ahorcado/ahorcado.component';
import { HomeComponent } from '../componentes/home/home.component';
import { MayormenorComponent } from '../componentes/juegos/mayormenor/mayormenor.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'ahorcado', component: AhorcadoComponent },
    { path: 'mayormenor', component: MayormenorComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JuegosRoutingModule { }