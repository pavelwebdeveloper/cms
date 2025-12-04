//import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'cms-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [ 
    CommonModule,
    RouterLink,
    RouterLinkActive,
    DropdownDirective
  ]/*,
  styleUrls: ['./header.component.css']*/
})

export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
}
