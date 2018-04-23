import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorLabelComponent } from './error-label.component';
import { AlertMessageComponent } from './alert-message.component';

@NgModule({
  declarations: [
    ErrorLabelComponent,
    AlertMessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [
    ErrorLabelComponent,
    AlertMessageComponent
  ]
})
export class SharedModule {}
