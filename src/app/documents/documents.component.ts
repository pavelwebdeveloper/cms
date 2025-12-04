import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document/document.service';
import { RouterModule } from '@angular/router';
import { DocumentListComponent } from './document-list/document-list.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'cms-documents',
  standalone: true,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  imports: [RouterModule, DocumentListComponent]
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
    
  }

}
