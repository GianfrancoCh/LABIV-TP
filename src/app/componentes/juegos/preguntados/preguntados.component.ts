import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../../servicios/paises.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  paises: any[] = [];

  constructor(private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.paisesService.getPaises().subscribe(
      (data) => {
        this.paises = data;
        console.log(this.paises);  // Verifica los países en la consola
      },
      (error) => {
        console.error('Error al obtener los países:', error);
      }
    );
  }
}