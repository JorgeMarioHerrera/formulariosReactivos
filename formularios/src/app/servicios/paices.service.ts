import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaicesService {

  constructor(private http: HttpClient) { }

  obtenerPaices() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe( map( (resp: any[]) =>
       resp.map( pais => ({nombre: pais.name, codigo: pais.alpha3Code })
      )
     )
     );
  }
}
