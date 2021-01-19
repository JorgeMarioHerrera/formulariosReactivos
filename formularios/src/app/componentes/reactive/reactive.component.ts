import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/servicios/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDatos();
    this.crearListener();

   }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get barrioNoValido() {
    return this.form.get('direccion.barrio').invalid && this.form.get('direccion.barrio').touched;
  }

  get ciudadNoValido() {
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  get pasatiempos() {
    return this.form.get('pasatiempos') as FormArray;
  }

  get contrasena1NoValido() {
    return this.form.get('contrasena1').invalid && this.form.get('contrasena1').touched;
  }

  get contrasena2NoValido() {
    const contrasena1 = this.form.get('contrasena1').value;
    const contrasena2 = this.form.get('contrasena2').value;
    return (contrasena1 === contrasena2) ? false : true;
  }
  get usuarioNoValido() {
    return this.form.get('nombreUsuario').invalid && this.form.get('nombreUsuario').touched;
  }

  crearFormulario() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.formBuilder.group({
        barrio: ['', Validators.required],
        ciudad: ['', Validators.required],
        numero: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([]),
      contrasena1: ['', [Validators.required]],
      contrasena2: ['', [Validators.required]],
      nombreUsuario: ['', , this.validadores.existeUsuario]
    }, {
      validators: this.validadores.contrasenasIguales('contrasena1', 'contrasena2')
    });

  }

  crearListener() {
   /*  this.form.valueChanges.subscribe(valor => {
      console.log(valor);
    });

    this.form.statusChanges.subscribe(status => {
      console.log(status);
    }) */

    this.form.get('nombre').valueChanges.subscribe(console.log);
  }


  cargarDatos() {
    this.form.reset({
      nombre: 'Elias',
      apellido: 'Rorckr',
      email: 'correo@correo.com',
      direccion: {
        barrio: 'canada',
        ciudad: 'el parado',
        numero: '12-12'
      }
      });
     // ['comer', 'dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)));
}

agregarPasatiempo() {
  this.pasatiempos.push( this.formBuilder.control('') );
}

borrarPasatiempo(i: number) {
  this.pasatiempos.removeAt(i);
}

  guardar() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( controle => controle.markAllAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      return;
    }
    this.form.reset();
  }



}
