import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from '../document.model';
import { MOCKDOCUMENTS } from '../MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

 documents: Document[] = [];
 
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  //constructor(private http: HttpClient) { 
  constructor(private http: HttpClient, private router: Router) {   
    //this.documents = MOCKDOCUMENTS;
    //this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[]{
    this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/documents.json')
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/')
    .subscribe((documents: Document[])=>{
      console.log("We are getting data");
      console.log(documents);
      this.documents = documents;
      //this.documents = this.documents.splice(0, 3);
      this.maxDocumentId = this.getMaxId();
      console.log("this.maxDocumentId");
      console.log(this.maxDocumentId);
      this.documents = this.documents.sort((currentElement, nextElement)=>{
        if(currentElement.name < nextElement.name){
          console.log("----------------------------------------");
          console.log("currentElement < nextElement");
          console.log("currentElement");
          console.log(currentElement);
          console.log("nextElement");
          console.log(nextElement);
          console.log("----------------------------------------");
          return -1;
        } else if(currentElement.name > nextElement.name){
          console.log("==========================================");
          console.log("currentElement > nextElement");
          console.log("currentElement");
          console.log(currentElement);
          console.log("nextElement");
          console.log(nextElement);
          console.log("==========================================");
          return 1;
        } else {
          console.log("**********************************************");
          console.log("currentElement == nextElement");
          console.log("currentElement");
          console.log(currentElement);
          console.log("nextElement");
          console.log(nextElement);
          console.log("**********************************************");
          return 0;
        }
      });
      this.documentListChangedEvent.next(this.documents.slice());
      this.router.navigate(['/documents']);
    },
    (error:any)=>{
      console.log(error);
    });
    return this.documents.slice();
  }


  storeDocuments(){
    const putData = JSON.stringify(this.documents);
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    this.http.put('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/documents.json', putData, {headers})
    .subscribe(() => {
      this.documents = this.documents.sort((currentElement, nextElement)=>{
        if(currentElement.name < nextElement.name){          
          return -1;
        } else if(currentElement.name > nextElement.name){
          return 1;
        } else {
          return 0;
        }
      });
      this.documentListChangedEvent.next(this.documents.slice());
    })
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }
}
