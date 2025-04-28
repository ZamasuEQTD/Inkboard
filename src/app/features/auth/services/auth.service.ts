import { computed, effect, Injectable, signal } from '@angular/core';
import { CurrentUser } from '../interfaces/current-user.interface';
import { DecodedToken } from '../interfaces/decoded-tokent.interface';
import { jwtDecode } from "jwt-decode";

const AUTH_KEY = "token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<CurrentUser | null>(null);

  token = signal<string | null | undefined>(loadToken()); 

  autenticado = computed(()=> this.currentUser !== null);

  createUserFromToken = effect(() => {
    if (this.token()) {

      const { name, sub, role }: DecodedToken = jwtDecode(this.token()!);

      this.currentUser.set({
        id: sub,
        username: name,
        role: role
      });
    }
  });

  constructor() { }

  get isModerador(): boolean {
    return this.currentUser()?.role.includes("Moderador") ? true : false;
  }


  logout(): void {  
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem(AUTH_KEY);
  }
}

function loadToken(): string | undefined {
  const token = localStorage.getItem(AUTH_KEY);

  return token ? token : undefined;
}