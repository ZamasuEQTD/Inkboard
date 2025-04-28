import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  grupos = input.required<MenuGroup[]>();
}

export interface MenuGroup {
  separator?:boolean;

  items: MenuItem[];
}

export interface MenuItem {
  label:string;
  icon?:string;
  color?:string;
  onTap?: () => void;
}