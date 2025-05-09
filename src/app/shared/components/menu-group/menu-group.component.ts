import { Component, input } from '@angular/core';
import { MenuGroup } from '../../interfaces/menu.interface';
import { MenuItemComponent } from "../menu-item/menu-item.component";

@Component({
  selector: 'app-menu-group',
  imports: [MenuItemComponent],
  templateUrl: './menu-group.component.html',
  styleUrl: './menu-group.component.css',
})
export class MenuGroupComponent {
  grupos = input.required<MenuGroup[]>();

}
