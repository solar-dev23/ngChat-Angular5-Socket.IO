import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../core/models';
import { ChatService, UserService } from '../../core/services';
import * as io from 'socket.io-client';
import { SERVER_URL } from '../../core/constants';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	private messages: Message[] = [];
	private content: string;
  private socket;
  private typingUser: string;

  constructor(private chatService: ChatService, private userService: UserService) {
  }

  async ngOnInit() {
    this.messages = await this.chatService.getLast7Days().toPromise();

    const token = localStorage.getItem('token');
    this.socket = io(SERVER_URL, {
      query: 'token=' + token
    });

    this.socket.on('receive', (data) => {
      this.messages.push(data.msg);
    });

    this.socket.on('receiveTyping', (data) => {
      const currentUser = this.userService.getUser();

      if(data.msg.status && data.msg.username !== currentUser.username)
        this.typingUser = data.msg.username;
      else
        this.typingUser = null;
    })
  }

  send(event) {
  	event.preventDefault();

  	if(this.content){
      this.socket.emit('send', this.content);
      this.socket.emit('typing', '');
	  	this.content = '';
   	}
  }

  typing(event) {
    if(!event)
      return;

    this.socket.emit('typing', event);
  }
}
