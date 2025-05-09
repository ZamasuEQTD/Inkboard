import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    auth = inject(AuthService);

    constructor(
     ) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.auth.autenticado()){
          console.log(request.url);
          console.log(this.auth.token());
  
          return next.handle(request);
        }

        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.auth.token()}`
          }
        });

        return next.handle(clonedRequest);
    }
}
