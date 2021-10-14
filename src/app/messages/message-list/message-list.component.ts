import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  //messages: Array<Message> = [
    messages: Message[] = [
    new Message('1', 'Genealogy', 'Have you ever been to that archive?', 'John'),
    new Message('2', 'Genealogy', 'I plan to visit the archive', 'Alex'),
    new Message('3', 'Travel', 'How long does it take to travel to that city by car?', 'Peter'),
    new Message('4', 'Travel', 'It takes about 2 hours', 'Ben')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}