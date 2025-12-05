import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact/contact.service';
import { RouterModule } from '@angular/router';
import { ContactsFilterPipe } from '../contacts-filter.pipe';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from 'src/app/contact-item/contact-item.component';
//import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [
    RouterModule, 
    CommonModule,
    ContactItemComponent,
    ContactsFilterPipe
  ]
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        console.log("///////////////////////////////////////////////");
        console.log(contacts);
      }
    )

    this.router.navigate(['/contacts']);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  search(value: string){

    this.term = value;

  }
}
