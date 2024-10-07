import { Component} from '@angular/core';


@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent {
  mazo: string[] = [];  
  cartaActual: string | null = null;  
  cartaSiguiente: string | null = null;  
  puntos = 0;

  constructor() {
    this.generarMazo(); 
    this.cartaActual = this.sacarCarta(); 
  }

  generarMazo() {
    const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9','0', 'J', 'Q', 'K'];
    this.mazo = valores.map(valor => `https://deckofcardsapi.com/static/img/${valor}H.png`);
    this.mazo = this.shuffle([...this.mazo]);  
  }

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);  
  }

  sacarCarta(): string | null {
    return this.mazo.pop() || null;  
  }

  adivinar(opcion: string) {
    this.cartaSiguiente = this.sacarCarta();

    if (this.cartaActual && this.cartaSiguiente) {
      const valorActual = this.extraerValorDeCarta(this.cartaActual);
      const valorSiguiente = this.extraerValorDeCarta(this.cartaSiguiente);

      if (
        (opcion === 'mayor' && valorSiguiente > valorActual) ||
        (opcion === 'menor' && valorSiguiente < valorActual)
      ) {
        this.puntos++;
      }

      this.cartaActual = this.cartaSiguiente;
      this.cartaSiguiente = null;  
    }
  }


  extraerValorDeCarta(cartaUrl: string): number {
    const nombreArchivo = cartaUrl.split('/').pop();  
    const valor = nombreArchivo?.substring(0, nombreArchivo.indexOf('H'));  
    
    // Convertir el valor de la carta a un número
    switch (valor) {
      case 'A': return 1;
      case '0': return 10;
      case 'J': return 11;
      case 'Q': return 12;
      case 'K': return 13;
      default: return parseInt(valor || '0');
    }
  }
}