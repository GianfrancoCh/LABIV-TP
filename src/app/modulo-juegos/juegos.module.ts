import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from '../componentes/juegos/ahorcado/ahorcado.component';
import { JuegosRoutingModule } from './juegos-routing.module';
import { MayormenorComponent } from '../componentes/juegos/mayormenor/mayormenor.component';
import { PreguntadosComponent } from '../componentes/juegos/preguntados/preguntados.component';
import { RunnerComponent } from '../componentes/juegos/runner/runner.component';


@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent,
    RunnerComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ],
  exports: [
    JuegosComponent
  ]
})
export class JuegosModule { }
