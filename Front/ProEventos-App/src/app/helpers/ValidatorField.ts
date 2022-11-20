import { AbstractControl, FormGroup } from "@angular/forms"

export class ValidatorField {

  static mustMatch(controlName: string, matchingControlName: string){
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value){
        matchingControl.setErrors({'mustMatch': true});
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    }
  }

  static optionalFieldWithMinLength(controlName: string, minLength: number){

    return (control: AbstractControl): any => {
      const senha = control.get(controlName);
      if(senha?.value.length>0 && senha?.value.length < minLength){
        control.get('senha')?.setErrors({'shortPassword': true});
        return null;
      }
      return null;
    }
  }

}
