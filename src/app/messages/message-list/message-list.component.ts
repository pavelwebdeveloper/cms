import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  //messages: Array<Message> = [
    /*messages: Message[] = [
    new Message('1', 'Genealogy', 'Have you ever been to that archive?', 'John'),
    new Message('2', 'Genealogy', 'I plan to visit the archive', 'Alex'),
    new Message('3', 'Travel', 'How long does it take to travel to that city by car?', 'Peter'),
    new Message('4', 'Travel', 'It takes about 2 hours', 'Ben')
  ];*/
  messages: Message[] = [];

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts();
    this.messages = this.messageService.getMessages();
    this.messageService.messagesChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    )
    console.log("lets see sorted messages");
    console.log(this.messages);
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
