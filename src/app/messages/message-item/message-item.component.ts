import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.contactService.getContacts();
    
    const contact: Contact = this.contactService.getContact(this.message.sender); 

    
    this.messageSender = contact.name;
    this.router.navigate(['/messages']);                
  }  

}
