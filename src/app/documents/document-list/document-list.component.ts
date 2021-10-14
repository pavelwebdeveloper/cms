import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document/document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  //@Output() selectedDocumentEvent = new EventEmitter<Document>();
  /*documents: Array<Document> = [
    new Document('d1', 'Tasks list', 'This is a list for the tasks', 'https://content.byui.edu/file/b7c3e5ed-6947-4971-9d32-4e5b6b397cac/CIT 366 course tasks list.pdf', null),
    new Document('d2', 'Instructions', 'Instructions for the tasks', 'https://content.byui.edu/file/b7c3e5ed-6947-4971-9d32-4e5b6b397cac/CIT 366 course instructions.pdf', null),
    new Document('d3', 'Plan', 'The plan for carrying out the tasks', 'https://content.byui.edu/file/b7c3e5ed-6947-4971-9d32-4e5b6b397cac/CIT 366 course plan.pdf', null),
    new Document('d4', 'Overview', 'The overview for the topic of the tasks', 'https://content.byui.edu/file/b7c3e5ed-6947-4971-9d32-4e5b6b397cac/CIT 366 course overview.pdf', null),
    new Document('d5', 'Schedule', 'The schedule for carrying out the tasks', 'https://content.byui.edu/file/b7c3e5ed-6947-4971-9d32-4e5b6b397cac/CIT 366 course schedule.pdf', null)
  ];*/

  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document){
    //this.selectedDocumentEvent.emit(document);
    this.documentService.documentSelectedEvent.emit(document);
  }

}
