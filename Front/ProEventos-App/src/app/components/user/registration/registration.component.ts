import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.validate();
	}

  public get f(): any {
    return this.form.controls;
  }

	public validate(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.mustMatch('senha', 'confirmarSenha')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      tosCheck: [false, Validators.requiredTrue]
    },
    formOptions);
	}

  public get passMatch(): boolean {
    return this.form.value.senha === this.form.value.confirmarSenha;
  }



}
