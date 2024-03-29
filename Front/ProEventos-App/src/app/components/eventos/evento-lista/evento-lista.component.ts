import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';



@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {


  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoToDelete: number = 0;

  public isCollapsed: boolean = false;
  private _filtroLista: string = "";

  public modalRef?: any = BsModalRef;

  public get filtroLista() {
    return this._filtroLista
  }

  public constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) {}

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter((x: any) => x.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    || x.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 )
  }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = _eventos;
      },
      error: (er: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar eventos.')
      },
      complete: () => {
        this.spinner.hide();
      }
    });

  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoToDelete = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.eventoService.deleteEvento(this.eventoToDelete).subscribe({
      next: (s: any) => {
        this.toastr.success('Evento excluído.');
        this.getEventos();
      },
      error: (er: Error) => {
        this.spinner.hide();
        this.toastr.error('Erro ao excluir evento.');
        console.log(er);
      },
      complete: () => {
        this.spinner.hide();
      }
    });

  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }


}



