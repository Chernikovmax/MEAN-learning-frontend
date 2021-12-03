import {AbstractControl, FormControl, Validators} from '@angular/forms';

export const requiredEmailValidators = [Validators.required, Validators.email];
export const emailValidators = [Validators.email];

export function hasRequiredValidator(control: FormControl): boolean {
  return (control?.validator && control.validator({} as AbstractControl)?.required) || false;
}

export function hasZeroOrEmptyStr(value: any) {
  return value === 0 || value === '';
}

export function hasValue(value: any): boolean {
// Для проверок, когда при проверках не нужно учитывать игнорировать "falsy" значения
  return value ? true : hasZeroOrEmptyStr(value);
}
