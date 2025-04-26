import { Component } from '@angular/core';
import { MenuButtonComponent } from "./components/menu-button/menu-button.component";

@Component({
  selector: 'app-header',
  imports: [MenuButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent { }
