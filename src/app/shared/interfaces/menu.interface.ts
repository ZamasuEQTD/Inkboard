export interface MenuGroup {
    separator?:boolean;  
    label?:string;
    items: MenuItem[];
}
  
export interface MenuItem {
    label:string;
    icon?:string;
    color?:string;
    onTap?: () => void;
}