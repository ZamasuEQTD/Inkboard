import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MenuGroup } from '../../interfaces/menu.interface';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { MenuGroupComponent } from "../menu-group/menu-group.component";

@Component({
  selector: 'app-menu',
  imports: [CommonModule, MenuGroupComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  grupos = input.required<MenuGroup[]>();
}


