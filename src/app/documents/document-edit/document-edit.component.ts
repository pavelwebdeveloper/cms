import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  @ViewChild('f', {static: false}) saveDocumentForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onCancel(){

  }

  onSubmit(form: NgForm){
    console.log(form);
  }
}
