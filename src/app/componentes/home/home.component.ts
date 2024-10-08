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
  titulo = 'BIENVENIDO A SALA DE JUEGOS';
  
  imagenCarta= 'https://deckofcardsapi.com/static/img/back.png'
  imagenAhorcado= 'assets/ahorcado.jpg'
  imagenBanderas = 'https://s1.abcstatics.com/media/cultura/2019/09/20/banderas-del-mundo-k0j--1248x698@abc.jpg'

  juegos = [
    { nombre: 'Ahorcado', link: '/juegos/ahorcado',imagen:this.imagenAhorcado },
    { nombre: 'Mayor Menor', link: '/juegos/mayormenor',imagen: this.imagenCarta },
    { nombre: 'Preguntados', link: '/juegos/preguntados',imagen: this.imagenBanderas },
    { nombre: 'Juego Propio', link: '/juegos/runner',imagen: this.imagenCarta }
  ];

  jugar(juego: any) {
    console.log(`Jugando ${juego.nombre}`);
  }
}
