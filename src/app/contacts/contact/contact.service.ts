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
  //maxContactId: number;

  constructor(private http: HttpClient, private router: Router) { 
    //this.contacts = MOCKCONTACTS;
   }

  getContacts(): Contact[]{
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/contacts.json')
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/')
    this.http.get('http://localhost:3000/contacts')
    //.subscribe((contacts: Contact[])=>{
      .subscribe((contacts: any)=>{
      console.log("We are getting data");
      console.log(contacts);
      this.contacts = contacts.contacts;
      //this.maxContactId = this.getMaxId();
      //console.log("this.maxDocumentId");
      //console.log(this.maxContactId);
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


  /*storeContacts(){
    const putData = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    //this.http.put('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', putData, {headers})
    this.http.put('http://localhost:3000/contacts', putData, {headers})
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
  }*/
  

  getContact(id: string): Contact{
     for(let i=0;i<this.contacts.length;i++){
       if(this.contacts[i].id == id){
         return this.contacts[i];
       }
     }
     return null;
   }

   // deleteContact method as it worked with FireBase
   /*deleteContact(contact: Contact) {
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.storeContacts();
    }*/
    deleteContact(contact: Contact) {

      if (!contact) {
        return;
      }
    
      const pos = this.contacts.findIndex(c => c.id === contact.id);
    
      if (pos < 0) {
        return;
      }
    
      // delete from database
      this.http.delete('http://localhost:3000/contacts/' + contact.id)
        .subscribe(
          (response: Response) => {
            this.contacts.splice(pos, 1);
            //this.storeContacts();
            this.contactListChangedEvent.next(this.contacts.slice());
          }
        );
    }

    /*getMaxId(): number{

      let maxId = 0;
      let currentId = 0;
  
     

      this.contacts.map((contact) => {
          currentId = +contact.id;
          if(currentId > maxId){
            maxId = currentId;
          }
      });
      
      return maxId;
    }*/
  
    // addContact method as it worked with FireBase
    /*addContact(newContact: Contact){
      if(!newContact){
        return;
      }
  
      this.maxContactId++;
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      this.storeContacts();
    }*/

    // addContact method implemented in a new way to make an HTTP POST request to NodeJS server to add the Contact
  // object passed as an argument to the contacts collection in the MongoDB database server

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Document is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contact);
          //this.sortAndSend();
          //let documentListClone = this.documents.slice();
          this.getContacts();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }
  
    // updateContact method as it worked with FireBase
    /*updateContact(originalContact: Contact, newContact: Contact) {
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
    }*/

      // updateContact method implemented in a new way to
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          //this.sortAndSend();
          //this.storeContacts();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }
}
