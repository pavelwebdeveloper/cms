import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document/document.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'cms-document-detail',
  standalone: true,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  imports: [RouterModule]
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private windRefService: WindRefService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView(){
    if(this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
 }

}
