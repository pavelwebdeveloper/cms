import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document/document.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  imports: [RouterModule, CommonModule, DocumentItemComponent]
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
        /*console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(this.documents);*/
      }
    )
    
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
