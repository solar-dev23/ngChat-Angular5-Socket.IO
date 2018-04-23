import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService, AuthService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private resetForm: FormGroup;
  private isValidForm: boolean;
  private oldPasswordValidation: string;
  private newPasswordValidation: string;
  private confirmPasswordValidation: string;
  private alertMessage: string;

  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  	this.initForm();
  }

  initForm() {
    this.resetForm = new FormGroup({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }

  getErrorMessage(type: string): any {
    if (type === 'oldPassword') {
      // this.oldPasswordValidation = ValidationService.passwordValidator({value: this.resetForm.controls['oldPassword'].value});

      // if(this.oldPasswordValidation) {
      //   this.isValidForm = false;
      //   return this.oldPasswordValidation;
      // }
    } else if(type === 'newPassword') {
      this.newPasswordValidation = ValidationService.passwordValidator({value: this.resetForm.controls['newPassword'].value});

      if(this.newPasswordValidation) {
        this.isValidForm = false;
        return this.newPasswordValidation;        
      }
    } else if (type === 'confirmPassword') {
      let newPassword = this.resetForm.controls['newPassword'].value;
      let confirmPassword = this.resetForm.controls['confirmPassword'].value;

      if(newPassword !== confirmPassword) {
        this.isValidForm = false;
        return 'Do not match password';
      } else {
        if(!this.oldPasswordValidation && !this.newPasswordValidation)
          this.isValidForm = true;
        else
          this.isValidForm = false;
      }
    }
  }

  onSubmit() {
    let params = {
      oldpwd: 'test',
      newpwd: this.resetForm.controls['newPassword'].value
    }

    // this.authService.resetPassword(params).subscribe(
    //   res => {
    //     this.alertMessage = "You have changed the password successfully.";
    //   }, err => {
    //     this.alertMessage = "Password Reset Error!";
    //   }
    // )
  }
}
