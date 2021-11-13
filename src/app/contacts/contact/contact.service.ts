import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../contact.model';
import { MOCKCONTACTS } from '../MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  //contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient, private router: Router) { 
    //this.contacts = MOCKCONTACTS;
   }

  getContacts(): Contact[]{
    this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/contacts.json')
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/')
    .subscribe((contacts: Contact[])=>{
      console.log("We are getting data");
      console.log(contacts);
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      console.log("this.maxDocumentId");
      console.log(this.maxContactId);
      this.contacts = this.contacts.sort((currentElement, nextElement)=>{
        if(currentElement.name < nextElement.name){          
          return -1;
        } else if(currentElement.name > nextElement.name){          
          return 1;
        } else {          
          return 0;
        }
      });
      this.contactListChangedEvent.next(this.contacts.slice());
      //this.router.navigate(['/contacts']);
    },
    (error:any)=>{
      console.log(error);
    });
    return this.contacts.slice();
  }


  storeContacts(){
    const putData = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    this.http.put('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', putData, {headers})
    .subscribe(() => {
      this.contacts = this.contacts.sort((currentElement, nextElement)=>{
        if(currentElement.name < nextElement.name){          
          return -1;
        } else if(currentElement.name > nextElement.name){
          return 1;
        } else {
          return 0;
        }
      });
      this.contactListChangedEvent.next(this.contacts.slice());
    })
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
   this.storeContacts();
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
      this.storeContacts();
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
      this.storeContacts();
    }
}
