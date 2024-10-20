import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements OnInit {
  public estaSaltando: boolean = false;
  public juegoIniciado: boolean = false;
  private alturaSalto: number = 12;
  private gravedad: number = 3;
  public posicionDino: number = 0; // Altura del dino
  public enemigos: { posicion: number }[] = []; // Posición horizontal de los enemigos
  public puntos: number = 0;
  private velocidadEnemigos: number = 6;
  private anchoObjeto: number = 50; // Ancho del dino y enemigos

  constructor() {}

  ngOnInit(): void {}

  iniciarJuego(): void {
    this.juegoIniciado = true;
    this.puntos = 0;
    this.posicionDino = 0;
    this.enemigos = [];
    this.generarEnemigos();
    this.iniciarCicloJuego();
    this.actualizarPuntaje();
  }

  iniciarCicloJuego(): void {
    setInterval(() => {
      if (this.juegoIniciado && !this.estaSaltando) {
        this.posicionDino -= this.gravedad;
        if (this.posicionDino < 0) this.posicionDino = 0;
      }
    }, 20);
  }

  generarEnemigos(): void {
    setInterval(() => {
      if (this.juegoIniciado) {
        this.enemigos.push({ posicion: 800 });
        this.moverEnemigos();
      }
    }, 2000);
  }

  moverEnemigos(): void {
    const intervaloMovimiento = setInterval(() => {
      if (!this.juegoIniciado) {
        clearInterval(intervaloMovimiento);
      } else {
        for (let i = 0; i < this.enemigos.length; i++) {
          const enemigo = this.enemigos[i];
          enemigo.posicion -= this.velocidadEnemigos;

          if (enemigo.posicion < -50) {
            this.enemigos.splice(i, 1);
            i--;
          }

          this.revisarColision(enemigo);
        }
      }
    }, 50);
  }

  revisarColision(enemigo: { posicion: number }): void {
    const dinoLeft = 0; // Dino siempre está a 100px desde la izquierda
    const dinoBottom = this.posicionDino; // Altura del dino
    const enemigoLeft = enemigo.posicion; // Posición horizontal del enemigo

    // Verificar si hay colisión horizontal
    const colisionHorizontal = 
      dinoLeft + this.anchoObjeto > enemigoLeft && // El lado derecho del dino toca al enemigo
      dinoLeft < enemigoLeft + this.anchoObjeto; // El lado izquierdo del enemigo toca al dino

    // Verificar si hay colisión vertical
    const colisionVertical = dinoBottom < this.anchoObjeto; // Dino está en el suelo

    if (colisionHorizontal && colisionVertical) {
      this.juegoIniciado = false;
      alert(`¡Juego terminado! Puntos: ${this.puntos}`);
      this.reiniciarJuego();
    }
  }

  saltar(): void {
    if (this.juegoIniciado && !this.estaSaltando) {
      this.estaSaltando = true;
      let contadorSalto = 0;

      const intervaloSalto = setInterval(() => {
        if (contadorSalto < 15) {
          this.posicionDino += this.alturaSalto;
        } else {
          this.estaSaltando = false;
          clearInterval(intervaloSalto);
        }
        contadorSalto++;
      }, 20);
    }
  }

  actualizarPuntaje(): void {
    setInterval(() => {
      if (this.juegoIniciado) this.puntos++;
    }, 100);
  }

  reiniciarJuego(): void {
    this.juegoIniciado = false;
    this.enemigos = [];
    this.posicionDino = 0;
    this.puntos = 0;
  }
}
