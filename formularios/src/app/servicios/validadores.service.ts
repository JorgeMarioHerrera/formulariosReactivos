import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }


  noHerrera(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      };
    }
    return null;

  }

  contrasenasIguales(c1: string, c2: string) {
    return ( formGroup: FormGroup ) => {
      const c1Control = formGroup.controls[c1];
      const c2Control = formGroup.controls[c2];

      if (c1Control.value === c2Control.value) {
        c2Control.setErrors(null)
      } else {
        c2Control.setErrors({ contrasenasIguales: true});
      }

    };
  }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise ( (resolve, reject) => {
      setTimeout( () => {
        if (control.value === 'nea') {
          resolve({existe: true});
        } else {
          resolve(null);
        }

      }, 3500);
    });

  }


}
