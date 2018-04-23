import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input() title: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }

  logout() {
    this.userService.resetUser();
  }
}
