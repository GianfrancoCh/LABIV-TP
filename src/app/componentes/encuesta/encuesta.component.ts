import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EncuestaComponent implements OnInit {
  encuestaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      pregunta1: ['', Validators.required], 
      juego1: [false],
      juego2: [false],
      juego3: [false],
      juego4: [false],
      pregunta3: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.encuestaForm.invalid) {
      this.encuestaForm.markAllAsTouched(); 
      return;
    }
    console.log('Formulario enviado:', this.encuestaForm.value);
  }
}
