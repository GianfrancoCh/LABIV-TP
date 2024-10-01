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
  titulo = 'Sala de Juegos';
  
  juegos = [
    { nombre: 'Ahorcado', link: '/juegos/ahorcado' },
    { nombre: 'Mayor Menor', link: '/juegos/mayormenor' },
    { nombre: 'Juego 3', link: '/juegos/juego3' },
    { nombre: 'Juego 4', link: '/juegos/juego4' }
  ];

  jugar(juego: any) {
    console.log(`Jugando ${juego.nombre}`);
  }
}
