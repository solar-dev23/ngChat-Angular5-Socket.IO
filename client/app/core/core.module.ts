import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  ValidationService,
  ApiService,
  AuthService,
  AuthGuard,
  UserService,
  ChatService
} from './services';

@NgModule({
  imports: [CommonModule],
  providers: [
    ValidationService,
    ApiService,
    AuthService,
    AuthGuard,
    UserService,
    ChatService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
