import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements OnInit {
  public estaSaltando: boolean = false;
  public juegoIniciado: boolean = false;
  private alturaSalto: number = 15;  
  private gravedad: number = 3;
  public posicionDino: number = 0;  

  public enemigos: { posicion: number }[] = [];  

  constructor() {}

  ngOnInit(): void {}

  iniciarJuego(): void {
    this.juegoIniciado = true;
    this.iniciarCicloJuego();
    this.generarEnemigo();  
  }

  iniciarCicloJuego() {
    setInterval(() => {
      if (!this.estaSaltando && this.juegoIniciado) {
        this.posicionDino -= this.gravedad; 
        if (this.posicionDino < 0) {
          this.posicionDino = 0;  
        }
      }
    }, 20);
  }

 
  generarEnemigo() {
    setInterval(() => {
      if (this.juegoIniciado) {
        
        this.enemigos.push({ posicion: 800 });

        this.moverEnemigos();  
      }
    }, 1500);  
  }

  moverEnemigos() {
    setInterval(() => {
      if (this.juegoIniciado) {
        for (let i = 0; i < this.enemigos.length; i++) {
          this.enemigos[i].posicion -= 5;  
          
      
          if (this.enemigos[i].posicion < -50) {
            this.enemigos.splice(i, 1);
            i--;  
          }

          this.revisarColision(this.enemigos[i]);  
        }
      }
    }, 50);
  }

  revisarColision(enemigo: { posicion: number }) {
    if (enemigo.posicion < 100 && enemigo.posicion > 50 && this.posicionDino < 50) {
      this.juegoIniciado = false;
      this.enemigos = [];  
      this.posicionDino = 0;  
    }
  }

  saltar() {
    if (!this.estaSaltando && this.juegoIniciado) {  
      this.estaSaltando = true;
      let contadorSalto = 0;

      const intervaloSalto = setInterval(() => {
        if (contadorSalto < 10) {  
          this.posicionDino += this.alturaSalto;  
        } else {
          this.estaSaltando = false;
          clearInterval(intervaloSalto);
        }
        contadorSalto++;
      }, 20);
    }
  }
}
