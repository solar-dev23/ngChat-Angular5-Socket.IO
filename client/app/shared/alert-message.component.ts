import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alert-message',
  template: `
              <div class="alert-message p-3"><p>{{message}}</p></div>
            `,
  styles: [
    `  
      .alert-message {
        background: #ff6358 !important;
        color: white;
        position: fixed;
        top: 40px;
        right: 10px;
        border-radius: 5px;
      }

      .alert-message p {
        margin: 0;
      }
    `
  ]
})
export class AlertMessageComponent implements OnInit {
  @Input() public message: string;

  constructor() {}

  ngOnInit(): void {
  }

}
