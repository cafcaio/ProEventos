import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;



  public get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validate();
  }

  public validate(): void {

    const formOptions: AbstractControlOptions = {
      validators: [
        ValidatorField.mustMatch('senha', 'confirmarSenha'),
        ValidatorField.optionalFieldWithMinLength('senha', 6)
      ]
    }


    this.form = this.fb.group({
      titulo: ['', [Validators.required]] ,
      primeiroNome: ['', [Validators.required]] ,
      ultimoNome: ['', [Validators.required]] ,
      email: ['', [Validators.required, Validators.email]] ,
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.pattern('[0-9]{10,11}')]] ,
      funcao: ['', [Validators.required]] ,
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      senha: ['', []],
      confirmarSenha: ['', []]
    }, formOptions)


  }

}
