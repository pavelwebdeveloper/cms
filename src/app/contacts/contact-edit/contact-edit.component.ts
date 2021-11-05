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
          return;
        }
        this.originalContact = this.contactService.getContact(this.id);
        
        if(!this.originalContact){
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        console.log(this.contact);
      }      
    );

    if(this.contact.group){
      this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
    }
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
    if(this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }
}
