import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  mailUrl = environment.apiEndpoint + 'user/mail';

  constructor(private _http: HttpClient) { }

  sendMail(subject: string, content: string, mail: string) {
    let form = new URLSearchParams();
    form.append('subject', subject);
    form.append('content', content);
    form.append('email', mail);
    return this._http.post<any>(this.mailUrl, form.toString, { headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }) });
  }

  sendmail1(object: any) {
    
    return this._http.post<any>("https://smtpjs.com/v3/smtpjs.aspx?", JSON.stringify(object), { headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }) });
  }



}
