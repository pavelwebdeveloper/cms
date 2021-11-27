import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = '101';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage(event){
    event.preventDefault();
    const messageSubject = this.subjectRef.nativeElement.value;
    const messageText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('5', messageSubject, messageText, this.currentSender);
    //this.addMessageEvent.emit(newMessage);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

}
