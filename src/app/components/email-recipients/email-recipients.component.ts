import {Component, EventEmitter, Output} from '@angular/core';
import {EmailErrorStateMatcher} from './state-matcher';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {EmailRecipientsControls, FormValue} from './types';
import {requiredEmailValidators, emailValidators, hasRequiredValidator} from './constants';
import {ErrorStateMatcher} from "@angular/material/core";


export class CustomMatStepperErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(!control?.value && control?.touched);
  }
}

@Component({
  selector: 'email-recipients',
  templateUrl: './email-recipients.component.html',
  styleUrls: ['./email-recipients.component.scss'],
})
export class EmailRecipientsComponent {
  @Output() formSubmit = new EventEmitter<FormValue>();

  emailFormControl = new FormControl('', requiredEmailValidators);
  themeFormControl = new FormControl('', [Validators.required]);
  contentFormControl = new FormControl('');
  recipientsFormControl = new FormControl([]);

  form = new FormGroup({
    email: this.emailFormControl,
    theme: this.themeFormControl,
    content: this.contentFormControl,
    recipients: this.recipientsFormControl,
  });

  emailMatcher = new EmailErrorStateMatcher();
  themeMatcher = new CustomMatStepperErrorMatcher();
  contentMatcher = new CustomMatStepperErrorMatcher();

  Controls = EmailRecipientsControls;

  /**
   * Метод, устанавливает инпут эмейла необязательным, если пользователь вводит несколько эмейлов,
   * (они добавляются в {@link recipientsFormControl}) и устанавливает обязательным, если в {@link recipientsFormControl}
   * отсутствуют эмейлы (при очистке)
   */
  actualizeEmailNecessity() {
    if (this.recipientsFormControl.value?.length && hasRequiredValidator(this.emailFormControl)) {
      this.emailFormControl.setValidators(emailValidators);
    } else if (!this.recipientsFormControl.value?.length && !hasRequiredValidator(this.emailFormControl)) {
      this.emailFormControl.setValidators(requiredEmailValidators);
      this.emailFormControl.updateValueAndValidity();
    }
  }

  addEmail() {
    if (!(this.emailFormControl?.value?.length && this.emailFormControl.valid)) {
      return;
    }
    const value = this.emailFormControl.value.trim();
    if (!this.recipientsFormControl.value?.includes(value)) {
      this.recipientsFormControl.patchValue(
        [...this.recipientsFormControl?.value || [], value],
      );
    }
    this.actualizeEmailNecessity();
    this.clearControl(EmailRecipientsControls.EMAIL);
  }


  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.addEmail(); // Переместит содержимое поля email в массив recipients
    this.formSubmit.emit({...this.form.value} as FormValue);
    this.form.reset();
    this.actualizeEmailNecessity();
  }

  clearControl(controlType: string) {
    switch (controlType) {
      case EmailRecipientsControls.RECIPIENTS: {
        this.recipientsFormControl.patchValue([]);
        this.actualizeEmailNecessity();
        return;
      }
      case EmailRecipientsControls.EMAIL: {
        this.emailFormControl.patchValue('');
        return;
      }
      case EmailRecipientsControls.THEME: {
        this.themeFormControl.patchValue('');
        return;
      }
      case EmailRecipientsControls.CONTENT: {
        this.contentFormControl.patchValue('');
        return;
      }
    }
    this.emailFormControl;
  }

  removeEmail(deletedRecipient: string) {
    const filtered = this.recipientsFormControl.value.filter((recipient: string) => recipient !== deletedRecipient);
    this.recipientsFormControl.patchValue(
      [...filtered],
    );
    if (!this.recipientsFormControl?.value?.length) { /* Если удаляется последний элемент, устанавливаем поле ввода
            эмейла обязательным */
      this.actualizeEmailNecessity();
    }
  }
}
