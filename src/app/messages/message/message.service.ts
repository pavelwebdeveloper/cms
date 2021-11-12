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
    this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/messages.json')
    //this.http.get('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/')
    .subscribe((messages: Message[])=>{
      console.log("We are getting data");
      console.log(messages);
      this.messages = messages;
      //this.documents = this.documents.splice(0, 3);
      this.maxMessageId = this.getMaxId();
      console.log("this.maxDocumentId");
      console.log(this.maxMessageId);
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


  storeMessages(){
    const putData = JSON.stringify(this.messages);
    const headers = new HttpHeaders({"Content-Type":"application/json"});
    this.http.put('https://cms-project-862f1-default-rtdb.europe-west1.firebasedatabase.app/messages.json', putData, {headers})
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
  }
  

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

   addMessage(message: Message){
     this.messages.push(message);
     this.storeMessages();
   }

   getMaxId(): number{

    let maxId = 0;
    let currentId = 0;

    this.messages.map((message) => {
        currentId = +message.id;
        if(currentId > maxId){
          maxId = currentId;
        }
    });
    
    return maxId;
  }
}
