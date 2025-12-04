import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cms-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent, 
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'cms';  
}
