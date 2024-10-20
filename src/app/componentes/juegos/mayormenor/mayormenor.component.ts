import { Component, OnInit } from '@angular/core';
import { PuntajeService } from '../../../servicios/puntaje.service'; 

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css'] // Cambiar de `styleUrl` a `styleUrls`
})
export class MayormenorComponent implements OnInit {
  mazo: string[] = [];
  cartaActual: string | null = null;
  cartaSiguiente: string | null = null;
  puntos = 0;

  constructor(private puntajeService: PuntajeService) {} // Inyectar el servicio

  async ngOnInit(): Promise<void> {
    await this.cargarPuntaje(); // Cargar el puntaje al iniciar el juego
    this.generarMazo();
    this.cartaActual = this.sacarCarta();
  }

  async cargarPuntaje() {
    this.puntos = await this.puntajeService.obtenerPuntaje('mayorMenor');
  }

  generarMazo() {
    const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
    this.mazo = valores.map(valor => `https://deckofcardsapi.com/static/img/${valor}H.png`);
    this.mazo = this.shuffle([...this.mazo]);
  }

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  sacarCarta(): string | null {
    return this.mazo.pop() || null;
  }

  async adivinar(opcion: string) {
    this.cartaSiguiente = this.sacarCarta();

    if (this.cartaActual && this.cartaSiguiente) {
      const valorActual = this.extraerValorDeCarta(this.cartaActual);
      const valorSiguiente = this.extraerValorDeCarta(this.cartaSiguiente);

      if (
        (opcion === 'mayor' && valorSiguiente > valorActual) ||
        (opcion === 'menor' && valorSiguiente < valorActual)
      ) {
        this.puntos++;
        await this.actualizarPuntaje(); // Actualizar el puntaje si acierta
      }else{
        this.puntos--;
        await this.actualizarPuntaje();
      }

      this.cartaActual = this.cartaSiguiente;
      this.cartaSiguiente = null;
    }
  }

  extraerValorDeCarta(cartaUrl: string): number {
    const nombreArchivo = cartaUrl.split('/').pop();
    const valor = nombreArchivo?.substring(0, nombreArchivo.indexOf('H'));

    switch (valor) {
      case 'A': return 1;
      case '0': return 10;
      case 'J': return 11;
      case 'Q': return 12;
      case 'K': return 13;
      default: return parseInt(valor || '0', 10);
    }
  }

  async actualizarPuntaje() {
    await this.puntajeService.guardarPuntaje('mayorMenor', this.puntos);
    console.log('Puntaje actualizado:', this.puntos);
  }
}
