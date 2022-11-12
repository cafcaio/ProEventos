import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];

  isCollapsed: boolean = false;
  private _filtroLista: string = "";

  public get filtroLista() {
    return this._filtroLista
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  public filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter((x: any) => x.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    || x.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 )
  }

  constructor(private http: HttpClient) {

  }


  ngOnInit(): void {
    this.getEventos();

  }

  public getEventos(): void {
    this.http.get("https://localhost:3000/api/evento").subscribe({
      next: (response) => {
        this.eventos = response;
        this.eventosFiltrados = response;
      },
      error: (er) => console.log(er)
    });



  }

}
