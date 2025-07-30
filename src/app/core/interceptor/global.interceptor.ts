import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  baseUrl: string = 'https://upskilling-egypt.com:3006/api/v1/';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let myRequest = request.clone({
      url: this.baseUrl + request.url,
    });
    console.log(myRequest);
    return next.handle(myRequest);
  }
}
