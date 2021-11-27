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
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/documents.json')
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/')
    this.http.get('http://localhost:3000/documents')
    //.subscribe((documents: Document[])=>{
    .subscribe((documents: any)=>{
      console.log("We are getting data");
      console.log(documents);
      this.documents = documents.documents;
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


  /*storeDocuments(){
    const putData = JSON.stringify(this.documents);
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    //this.http.put('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/documents.json', putData, {headers})
    this.http.put('http://localhost:3000/documents', putData, {headers})
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
  }*/
  

  getDocument(id: string): Document{
    for(let i=0;i<this.documents.length;i++){
      if(this.documents[i].id == id){
        return this.documents[i];
      }
    }
    return null;    
  }

  // deleteDocument method as it worked with FireBase
  /*deleteDocument(document: Document) {
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
 }*/

 // deleteDocument method implemented in a new way
 deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        //this.storeDocuments();
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
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

  // addDocument method as it worked with FireBase
  /*addDocument(newDocument: Document){
    if(!newDocument){
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentListClone = this.documents.slice();
    this.storeDocuments();
  }*/

  // addDocument method implemented in a new way to make an HTTP POST request to NodeJS server to add the Document
  // object passed as an argument to the documents collection in the MongoDB database server

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    console.log("inside service addDocument");
    console.log(document);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          //this.sortAndSend();
          //let documentListClone = this.documents.slice();
          //this.storeDocuments();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  // updateDocument method as it worked with FireBase
  /*updateDocument(originalDocument: Document, newDocument: Document) {
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
  }*/

  // updateDocument method implemented in a new way to
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          //this.sortAndSend();
          //this.storeDocuments();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }
}
