import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact/contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  id: string;
  editMode: boolean = false;
  originalContact: Contact;
  contact: Contact;
  invalidGroupContactAdded: boolean = false;
  groupContacts: Contact[] = [];
  @ViewChild('f', {static: false}) saveDocumentForm: NgForm;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        
        if(!this.id){
          this.editMode = false;
          console.log("EDIT MODE");
          console.log(this.editMode);
          return;
        }
        this.originalContact = this.contactService.getContact(this.id);
        
        if(!this.originalContact){
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        console.log(this.contact);
        console.log("GROUP");
        console.log(this.contact.group);

        if(this.contact.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          console.log("GROUP");
          console.log(this.contact.group);
        }   
      } 
      
       
    ) 
    
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
    if(this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }
    if(this.contact && newContact.id === this.contact.id){
      return true;
    }
    for(let i=0; i < this.groupContacts.length;i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if(invalidGroupContact){
      this.invalidGroupContactAdded = true;
      return;
    }
    this.invalidGroupContactAdded = false;
    this.groupContacts.push(selectedContact);
    //this.contactService
    console.log("groupContacts");
    console.log(this.groupContacts);
  }

  onRemoveItem(index:number){
    if( index < 0 || index >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
