import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../contact.model';
import { MOCKCONTACTS } from '../MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[]{
     return this.contacts.slice();
   }

   getContact(id: string): Contact{
     for(let i=0;i<this.contacts.length;i++){
       if(this.contacts[i].id == id){
         return this.contacts[i];
       }
     }
     return null;
   }

   deleteContact(contact: Contact) {
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.contactListChangedEvent.next(this.contacts.slice());
    }

    getMaxId(): number{

      let maxId = 0;
      let currentId = 0;
  
      this.contacts.map((contact) => {
          currentId = +contact.id;
          if(currentId > maxId){
            maxId = currentId;
          }
      });
      
      return maxId;
    }
  
    addContact(newContact: Contact){
      if(!newContact){
        return;
      }
  
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      this.contactListChangedEvent.next(this.contacts.slice());
    }
  
    
    updateContact(originalContact: Contact, newContact: Contact) {
      if(!originalContact || !newContact){
        return;
      }
  
      let pos = this.contacts.indexOf(originalContact);
      if(pos < 0){
        return;
      }
  
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
      let documentListClone = this.contacts.slice();
      this.contactListChangedEvent.next(this.contacts.slice());
    }
}
