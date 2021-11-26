import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '../message.model';
import { MOCKMESSAGES } from '../MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient, private router: Router) { 
    //this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[]{
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/messages.json')
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/')
    this.http.get('http://localhost:3000/messages')
    //.subscribe((messages: Message[])=>{
    .subscribe((messages: any)=>{
      console.log("We are getting data");
      console.log(messages.messages);
      this.messages = messages.messages;
      //this.documents = this.documents.splice(0, 3);
      /*this.maxMessageId = this.getMaxId();
      console.log("this.maxDocumentId");
      console.log(this.maxMessageId);*/
      this.messages = this.messages.sort((currentElement, nextElement)=>{
        if(+currentElement.sender < +nextElement.sender){
          
          return -1;
        } else if(+currentElement.sender > +nextElement.sender){
          
          return 1;
        } else {
          
          return 0;
        }
      });
      this.messagesChangedEvent.next(this.messages.slice());
      this.router.navigate(['/messages']);
    },
    (error:any)=>{
      console.log(error);
    });
    return this.messages.slice();
  }


  /*storeMessages(){
    const putData = JSON.stringify(this.messages);
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    //this.http.put('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/messages.json', putData, {headers})
    this.http.put('http://localhost:3000/messages', putData, {headers})
    .subscribe(() => {
      this.messages = this.messages.sort((currentElement, nextElement)=>{
        if(+currentElement.sender < +nextElement.sender){          
          return -1;
        } else if(+currentElement.sender > +nextElement.sender){
          return 1;
        } else {
          return 0;
        }
      });
      this.messagesChangedEvent.next(this.messages.slice());
    })
  }*/
  

   /*getMessages(): Message[]{
     return this.messages.slice();
   }*/

   getMessage(id: string): Message{
     for(let i=0;i<this.messages.length;i++){
       if(this.messages[i].id == id){
         return this.messages[i];
       }
     }
     return null;
   }

   // addMessage method as it worked with FireBase
   /*addMessage(message: Message){
     this.messages.push(message);
     this.storeMessages();
   }*/

   // addMessage method implemented in a new way to make an HTTP POST request to NodeJS server to add the Message
  // object passed as an argument to the messages collection in the MongoDB database server

  addMessage(msg: Message) {
    if (!msg) {
      return;
    }

    // make sure id of the new Document is empty
    msg.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, msg: Message }>('http://localhost:3000/messages',
      msg,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.msg);
          //this.sortAndSend();
          //let documentListClone = this.documents.slice();
          //this.storeMessages();
        }
      );
  }

   /*getMaxId(): number{

    let maxId = 0;
    let currentId = 0;

    console.log("messages inside getMaxId function");
      console.log(this.messages);

    this.messages.map((message) => {
        currentId = +message.id;
        if(currentId > maxId){
          maxId = currentId;
        }
    });
    
    return maxId;
  }*/
}
