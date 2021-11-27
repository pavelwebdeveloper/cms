import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document/document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  @ViewChild('f', {static: false}) saveDocumentForm: NgForm;

  constructor(private documentService: DocumentService,
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
        this.originalDocument = this.documentService.getDocument(this.id);
        
        if(!this.originalDocument){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
        console.log(this.document);
      }
    );
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm){
    //console.log(form.value);
    const value = form.value;
    const newDocument = new Document(value.id, value.name, value.description, value.url, null);
    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
}
