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
    new Message('1', 'Genealogy', 'here is a link to the list of genealogy databases: https://en.wikipedia.org/wiki/List_of_genealogy_databases', 'Ivan'),
    new Message('2', 'Genealogy', 'I plan to visit the archive at Astrakhan', 'Oleg'),
    new Message('3', 'Travel', 'How long does it take to travel to Kherson by car?', 'Sergei'),
    new Message('4', 'travel', 'It takes about 5-6 hours', 'Oleg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
