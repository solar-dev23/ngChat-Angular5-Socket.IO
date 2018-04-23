import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService, AuthService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private isValidForm: boolean;
  private emailValidation: string;
  private passwordValidation: string;
  private alertMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  	this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  getErrorMessage(type: string): any {
    if(type === 'email') {
      this.emailValidation = ValidationService.emailValidator({value: this.loginForm.controls['email'].value});

      if(this.emailValidation) {
        return this.emailValidation;
      }
    } else if (type === 'password') {
      this.passwordValidation = ValidationService.passwordValidator({value: this.loginForm.controls['password'].value});

      if(this.passwordValidation) {
        this.isValidForm = false;
        return this.passwordValidation;
      }else {
        if(!this.emailValidation)
          this.isValidForm = true;
        else
          this.isValidForm = false;
      }
    }
  }

  onSubmit() {
    let params = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }

    this.authService.login(params).subscribe(
      res => {
        this.router.navigate(['']);
      }, err => {
        this.alertMessage = JSON.parse(err).message;
      }
    )
  }
}
