import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class HomeComponent {
  titulo = 'SALA DE JUEGOS';
  
  imagenCarta= 'https://deckofcardsapi.com/static/img/back.png'
  imagenAhorcado= 'assets/ahorcado.jpg'

  juegos = [
    { nombre: 'Ahorcado', link: '/juegos/ahorcado',imagen:this.imagenAhorcado },
    { nombre: 'Mayor Menor', link: '/juegos/mayormenor',imagen: this.imagenCarta },
    { nombre: 'Preguntados', link: '/juegos/preguntados',imagen: this.imagenAhorcado },
    { nombre: 'Juego 4', link: '/juegos/juego4',imagen: 'assets/img/ahorcado.png' }
  ];

  jugar(juego: any) {
    console.log(`Jugando ${juego.nombre}`);
  }
}
