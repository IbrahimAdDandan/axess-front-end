import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { environment } from "../environments/environment.prod";
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const _sid = localStorage.getItem('sid');
    // if (_sid && request.url.toLowerCase().indexOf("hash") !== -1) {
    //   // const header = request.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //   // const cloneReq = request.clone({ url: request.url + "?sid=" + _sid, headers: request.headers.append('Content-Type', 'application/x-www-form-urlencoded') });
    //   const cloneReq = request.clone({ url: request.url + "?sid=" + _sid});
    //   debugger;
    //   return next.handle(cloneReq);
    // }
    if (_sid && request.url.toLowerCase().indexOf(environment.apiEndpoint.toLowerCase()) !== -1) {
      // request.params.append('sid', _sid)
      const cloneReq = request.clone({ params: request.params.append('sid', _sid) });
      // const cloneReq = request.clone({ url: request.url + "?&type=json&sid=" + _sid });
      // debugger;
      return next.handle(cloneReq);
    }
    // else if (request.url.toLowerCase().indexOf("login") !== -1) {
    //   const cloneReq = request.clone( { url: environment.apiEndpoint + request.url });
    // return next.handle(cloneReq);
    // }
    const cloneReq = request.clone({ url: request.url });
    return next.handle(cloneReq);
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // console.log('from interceptor: ' + err);
    // if (err.status === 401 || err.status === 403) {
    //   return Observable.throw(err);
    // }
    return Observable.throw(err);
  }

}
