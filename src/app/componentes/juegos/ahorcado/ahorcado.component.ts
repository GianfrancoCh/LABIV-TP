import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  palabra: string = ''; 
  palabraOculta: string = ''; 
  intentos: number = 0; 
  letrasFalladas: string[] = []; 
  letrasAdivinadas: string[] = []; 
  juegoTerminado: boolean = false; 


  palabras: string[] = ['test','gian'];
  maxIntentos: number = 5; 

  constructor() { }

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.intentos = 0;
    this.letrasFalladas = [];
    this.letrasAdivinadas = [];
    this.juegoTerminado = false;

    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_ '.repeat(this.palabra.length).trim();
  }

  comprobarLetra(letra: string) {
    letra = letra.toLowerCase();

    if (this.juegoTerminado) {
      return;
    }

    if (this.palabra.includes(letra)) {
   
      this.letrasAdivinadas.push(letra);
      this.revelarPalabra();
    } else {
      
      if (!this.letrasFalladas.includes(letra)) {
        this.letrasFalladas.push(letra);
        this.intentos++;
      }
    }

 
    if (this.intentos >= this.maxIntentos) {
      this.juegoTerminado = true;
    }

    if (!this.palabraOculta.includes('_')) {
      this.juegoTerminado = true;
    }
  }

  revelarPalabra() {
    this.palabraOculta = this.palabra
      .split('')
      .map(letra => (this.letrasAdivinadas.includes(letra) ? letra : '_'))
      .join(' ');
  }

  reiniciar() {
    this.iniciarJuego();
  }
}
