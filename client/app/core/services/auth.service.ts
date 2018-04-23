import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
	constructor(
    private api: ApiService,
    private user: UserService
  ) { }

  login(data) {
    return this.api.login(data)
      .map((res: any) => {
        this.user.setUser(res.result.user.username, res.result.user.email, res.result.token);
        return true;
      });
  }

  register(data) {
    return this.api.register(data)
      .map((res: any) => {
        this.user.setUser(res.result.user.username, res.result.user.email, res.result.token);
        return true;
      });
  }

	// public resetPassword(params: any) {
	// 	return new Observable((observer) => {
	// 		let body = JSON.stringify(params);
	// 		this.http.post('http://192.168.0.27:8080/changepwd', body, {headers: this.headers}).subscribe(
	// 			res => {
	// 				this.auth_token = 'test';
	// 				observer.next(res.json());
	// 				observer.complete();
	// 			}, err => console.log(err)
	// 		)
	// 	})
	// }

}

