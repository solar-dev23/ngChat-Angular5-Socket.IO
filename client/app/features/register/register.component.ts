import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService, AuthService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private isValidForm: boolean;
  private emailValidation: string;
  private usernameValidation: string;
  private passwordValidation: string;
  private alertMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  	this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  getErrorMessage(type: string): any {
  	if(type === 'email') {
  		this.emailValidation = ValidationService.emailValidator({value: this.registerForm.controls['email'].value});

  		if(this.emailValidation) {
  			return this.emailValidation;
  		}
  	} else if (type === 'username') {
      this.usernameValidation = ValidationService.usernameValidator({value: this.registerForm.controls['username'].value});

      if(this.usernameValidation) {
        return this.usernameValidation;
      }
  	} else if (type === 'password') {
  		this.passwordValidation = ValidationService.passwordValidator({value: this.registerForm.controls['password'].value});

  		if(this.passwordValidation) {
  			return this.passwordValidation;
  		}
  	} else if (type === 'confirm-password') {
      let password = this.registerForm.controls['password'].value;
      let confirmPassword = this.registerForm.controls['confirmPassword'].value;

      if(password !== confirmPassword) {
        this.isValidForm = false;
        return 'Do not match password';
      } else {
        if(!this.emailValidation && !this.usernameValidation && !this.passwordValidation)
          this.isValidForm = true;
        else
          this.isValidForm = false;
      }
  	}
  }

  onSubmit() {
    let params = {
      email: this.registerForm.controls['email'].value,
      username: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value,
      confirmPassword: this.registerForm.controls['confirmPassword'].value
    }

    this.authService.register(params).subscribe(
      res => {
        this.router.navigate(['']);
      }, err => {
        this.alertMessage = JSON.parse(err).message;
      }
    )
  }
}
