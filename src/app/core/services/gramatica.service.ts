import { Injectable } from '@angular/core';
import { Gramatica } from '../../pages/gramatica/gramatica.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GramaticaService {
    
    baseUrl = 'http://localhost:3000/grammar';

    constructor(private http: HttpClient){}

    getById(id: string): Observable<Gramatica>{
        return this.http.get<Gramatica>(`${this.baseUrl}/${id}`);
    }

    updateGramatica(gramatica: Gramatica): Observable<Gramatica>{
        return this.http.put<Gramatica>(`${this.baseUrl}/${gramatica.id}`, gramatica);
    }

}