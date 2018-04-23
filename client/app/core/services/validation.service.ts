import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
	static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
		let config = {
			'required': 'Required',
			'invalidEmail': 'Invalid Email Address',
			'inValidPassword': 'Password must be at least 8 characters long.'
		};

		return config[validatorName];
	}

	static emailValidator(control) {
		if(!control.value)
			return;

    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
    } else {
        return 'Invalid email address';
    }
	}

  static passwordValidator(control) {
    if(!control.value)
      return;
    
    if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)) {
        return 'Password must contain at least 6 characters, 1 lowercase, 1 uppercase, 1 numeric character and 1 special character';
    }else {
        return null;
    }
  }

  static usernameValidator(control) {
    if(!control.value)
      return;

    if(control.value.length >=  4)
      return null;
    else
      return 'Username must be at least 4 characters long.';
  }
}