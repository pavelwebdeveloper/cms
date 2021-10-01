import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html'/*,
  styleUrls: ['./header.component.css']*/
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(selectedEvent: string){
    this.selectedFeatureEvent.emit(selectedEvent);
  }

}
