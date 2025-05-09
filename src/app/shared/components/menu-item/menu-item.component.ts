import { Component, input } from '@angular/core';
import { MenuItem } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
}
