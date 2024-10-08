import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../../servicios/paises.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  public banderaPais: string = ''; 
  public respuestaCorrecta: string = '';  
  public opciones: string[] = [];  
  public todosLosPaises: any[] = [];  
  mensaje: string = '';
  cargando: boolean = false;
  puntaje: number = 0;
  juegoEmpezado: boolean = false;

  constructor(private paisesService: PaisesService) {}

  
  ngOnInit(): void {
    this.iniciarJuego(); 
  }

  iniciarJuego(): void {
    this.cargando = true;
    this.juegoEmpezado = true;
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.paisesService.getPaises().subscribe({
      next: (data) => {
        this.todosLosPaises = data;
        this.generarPregunta();
      },
      error: (error) => {
        this.mensaje = 'Error al cargar los países. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  generarPregunta(): void {
    const indiceAleatorio = Math.floor(Math.random() * this.todosLosPaises.length);
    const paisElegido = this.todosLosPaises[indiceAleatorio];

    this.banderaPais = paisElegido.flags.png;  
    this.respuestaCorrecta = paisElegido.name.common; 

    const opcionesIncorrectas = this.generarOpcionesIncorrectas(indiceAleatorio);

    this.opciones = this.mezclarOpciones([this.respuestaCorrecta, ...opcionesIncorrectas]);
    this.cargando = false;
  }

  generarOpcionesIncorrectas(indiceRespuestaCorrecta: number): string[] {
    const respuestasIncorrectas: string[] = [];
    while (respuestasIncorrectas.length < 2) {
      const indiceAleatorio = Math.floor(Math.random() * this.todosLosPaises.length);
      if (indiceAleatorio !== indiceRespuestaCorrecta && !respuestasIncorrectas.includes(this.todosLosPaises[indiceAleatorio].name.common)) {
        respuestasIncorrectas.push(this.todosLosPaises[indiceAleatorio].name.common);
      }
    }
    return respuestasIncorrectas;
  }

  mezclarOpciones(opciones: string[]): string[] {
    return opciones.sort(() => Math.random() - 0.5);
  }

  adivinarPais(respuestaSeleccionada: string): void {
    if (respuestaSeleccionada === this.respuestaCorrecta) {
      this.puntaje++;
      this.mensaje = `¡Correcto! Puntos acumulados: ${this.puntaje}`;
      this.generarPregunta(); 
    } else {
      this.mensaje = `El país correcto era: ${this.respuestaCorrecta}. Puntos finales: ${this.puntaje}`;
      this.puntaje = 0;
      this.generarPregunta(); 
    }
  }
}
