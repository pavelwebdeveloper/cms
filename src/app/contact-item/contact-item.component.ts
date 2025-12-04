import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'cms-contact-item',
  standalone: true,
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
  imports: [RouterModule]
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}
