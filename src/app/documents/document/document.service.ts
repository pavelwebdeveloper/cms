import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id: string): Document{
    for(let i=0;i<this.documents.length;i++){
      if(this.documents[i].id == id){
        return this.documents[i];
      }
    }
    return null;    
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    //this.documentChangedEvent.emit(this.documents.slice());
    this.documentListChangedEvent.next(this.documents.slice());
 }

  getMaxId(): number{

    let maxId = 0;
    let currentId = 0;

    this.documents.map((document) => {
        currentId = +document.id;
        if(currentId > maxId){
          maxId = currentId;
        }
    });
    
    return maxId;
  }

  addDocument(newDocument: Document){
    if(!newDocument){
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }

  
  updateDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument){
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if(pos < 0){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);
  }
}
