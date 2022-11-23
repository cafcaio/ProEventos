import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {


  form!: FormGroup;
  locale: string = 'pt-br';
  _eventoNaTela = {} as Evento;
  saveMode: string = 'post'



  constructor(private fb: FormBuilder,
              private ls: BsLocaleService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {

              }

  ngOnInit(): void {
    this.validation();
    this.ls.use('pt-br');
    this.carregarEvento();
  }

  get f(): any {
    return this.form.controls;
  }

  get bsconfig(): any {
    return {isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm A',
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      withTimepicker: true
      };
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', [Validators.required, Validators.pattern(/^\w+\.(gif|jpe?g|bmp|png)$/)]]
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public carregarEvento(): void {

    const eventoIdParam = this.activeRoute.snapshot.paramMap.get('id');
    if (eventoIdParam !== null){
      this.saveMode = 'put'
      this.spinner.show();

      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this._eventoNaTela = {... evento};

          this.form.patchValue(
            Object.assign(this._eventoNaTela,
            {dataEvento: new Date(this._eventoNaTela.dataEvento)})
          );

        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar evento.');
          console.error(error);
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }

  }

  public salvarAlteracao(): void { //put ou post

    if(this.form.valid){
      this.spinner.show();

      let obs: any = {
        next: () => {
          this.toastr.success('Evento salvo.');
          this.router.navigate(['/eventos/lista']);
        },
        error: (er: Error) => {
          this.spinner.hide();
          console.error(er);
          this.toastr.error('Erro ao salvar evento.')
        },
        complete: () => {
          this.spinner.hide();
        }};

      this._eventoNaTela = (this.saveMode == 'post')
      ? {...this.form.value}
      : {id: this._eventoNaTela.id, ...this.form.value};

      this.saveMode == 'put'
      ? this.eventoService.putEvento(this._eventoNaTela).subscribe(obs)
      : this.eventoService.postEvento(this._eventoNaTela).subscribe(obs)


    }
  }

}
