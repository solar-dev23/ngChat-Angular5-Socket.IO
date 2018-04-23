import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'error-label',
  template: `
              <div class="error-message">{{error}}</div>
            `,
  styles: [
    `  
      .error-message {
        color: #ff6358 !important;
        margin-top: 2px;
        margin-left: 5px;
      }
    `
  ]
})
export class ErrorLabelComponent implements OnInit {
  @Input() public error: string;

  constructor() {}

  ngOnInit(): void {
  }

}
