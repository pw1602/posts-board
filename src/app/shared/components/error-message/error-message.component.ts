import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: AbstractControl;

  static getValidationMessage(validator: string, validatorValue?: any): string {
    const messages = {
      'required': 'This field is required',
      'minlength': `Min lenght is ${validatorValue.requiredLength} characters`,
      'maxlength': `Max lenght is ${validatorValue.requiredLength} characters`,
      'email': 'This email is not valid!',
    };

    return messages[validator];
  }

  constructor() { }

  ngOnInit() {
  }

  get errorMessage(): string {
    for (const key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key) && (this.control.dirty || this.control.touched)) {
        return ErrorMessageComponent.getValidationMessage(key, this.control.errors[key]);
      }
    }

    return null;
  }

}
