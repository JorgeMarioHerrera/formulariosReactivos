import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaicesService } from 'src/app/servicios/paices.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'mario',
    apellido: 'herrera',
    email: 'correo@corre.com',
    pais: 'COL',
    genero: ''
  };

  paises: any[] = [];

  constructor(private pais: PaicesService) { }

  ngOnInit(): void {
    this.pais.obtenerPaices().subscribe(paices => {
      this.paises = paices;
      this.paises.unshift({
        nombre: 'Seleccione un País.',
        codigo: 'F'
      });
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }
    console.log(form);
    console.log(form.value);
  }

}
