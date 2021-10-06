import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Array<Document> = [
    new Document('d1', 'Tasks list', 'This is a list for the tasks', '../images/image1.jpg', null),
    new Document('d2', 'Instructions', 'Instructions for the tasks', '../images/image2.jpg', null),
    new Document('d3', 'Plan', 'The plan for carrying out the tasks', '../images/image3.jpg', null),
    new Document('d4', 'Overview', 'The overview for the topic of the tasks', '../images/image4.jpg', null)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
