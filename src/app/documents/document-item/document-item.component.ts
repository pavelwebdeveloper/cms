import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  imports: [RouterModule]
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;

  

  constructor() { }

  ngOnInit(): void {
    /*console.log("###########################################");
        console.log(this.document);*/
  }

}
