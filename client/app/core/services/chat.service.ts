import { Injectable } from "@angular/core";
import { ApiService } from './api.service';

@Injectable()
export class ChatService {
	constructor(
    private api: ApiService
  ) { }

  getLast7Days() {
    return this.api.getLast7Days()
      .map((res: any) => {
        return res;
      });
  }
}

