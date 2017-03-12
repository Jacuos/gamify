import {Directive, Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import {NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgModel,} from '@angular/forms';

export function forbiddenNameValidator(pass1:string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    return pass1 != control.value ? {'validatePassword':"false"}: null;
  };
}

@Directive({
  selector: '[validatepassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true}]
})
export class PasswordValidator implements Validator, OnChanges {
  @Input() validatepassword: string;

  private valFn = Validators.nullValidator;
  ngOnChanges(changes: SimpleChanges): void {
    var change = changes["validatepassword"];
    console.log("change: "+change.currentValue);
    this.valFn = forbiddenNameValidator(change.currentValue);
  }
  validate(control: AbstractControl): {[key: string]: any} {
    console.log(this.validatepassword);
    return this.valFn(control);
  }
}
