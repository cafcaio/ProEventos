import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable(
// {
//   providedIn: 'root'
// }
)
export class EventoService {
  baseURL = "https://localhost:3000/api/evento";

constructor(private http: HttpClient) { }

public getEventos(): Observable<Evento[]> {
  return this.http.get<Evento[]>(this.baseURL).pipe(first());
}

public getEventosByTema(tema: string): Observable<Evento[]> {
  return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`).pipe(first());
}

public getEventoById(id: number): Observable<Evento> {
  return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(first());
}

public postEvento(evento: Evento): Observable<Evento> {
  return this.http.post<Evento>(this.baseURL, evento).pipe(first());
}

public putEvento(evento: Evento): Observable<Evento> {
  return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento).pipe(first());
}

public deleteEvento(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseURL}/${id}`).pipe(first());
}

}
