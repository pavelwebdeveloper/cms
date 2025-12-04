import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact/contact.service';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  imports: [RouterOutlet, ContactListComponent]
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    )
  }

}
