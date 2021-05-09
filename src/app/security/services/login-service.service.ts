import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../../models/user.model";
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginUrl = environment.apiEndpoint + 'user/login';
  private _userURL = environment.apiEndpoint + 'user';
  private _wicketLogin = environment.wicket + 'org.apache.openmeetings.web.pages.auth.SignInPage?0-1.2-signin';


  constructor(private _http: HttpClient, private _router: Router) { }

  login(username: string, password: string) {
    // console.log("from service pass is: " + password);
    return this._http.get<any>(this._loginUrl + '?user=' + encodeURIComponent(username) + '&pass=' + encodeURIComponent(password));
  }

  changePass(password: string) {
    // debugger;
    const id = localStorage.getItem('userId');
    if (this.loggedIn && !!id) {
      
      return this._http.post<any>(this._userURL + '/changepass?id=' + id + '&pass=' + password, null);
    } else {
      this._router.navigate(['/security/login']);
    }

  }

  forgotPass(mail: string) {
    return this._http.get<any>(this._userURL + '/forgot?email=' + mail);
  }

  loginToWicket(username: string, password: string) {
    //login=USERNAME&pass=PASSWORD
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Wicket-Ajax': 'true',
      'Wicket-Ajax-BaseURL': 'signin',
      'Wicket-FocusedElementId': 'btnc5',
      'X-Requested-With': 'XMLHttpRequest'
    });

    let form = new URLSearchParams();
    form.append('login', username);
    form.append('pass', password);

    return this._http.post<any>(this._wicketLogin, form.toString(), { headers: header });
  }

  updateProfile(user: User) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    let form = new URLSearchParams();
    form.append('user', JSON.stringify(user));
    const id = localStorage.getItem('userId');

    return this._http.post<any>(this._userURL + '/' + id, form.toString(), { headers: header });
  }

  register(user: User) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    let form = new URLSearchParams();
    form.append('user', JSON.stringify(user));
    form.append('confirm', 'false');

    return this._http.post<any>(this._userURL + '/register', form.toString(), { headers: header });
  }

  loggedIn() {
    return !!localStorage.getItem('sid');
  }

  getUserName() {
    return localStorage.getItem('email');
  }

  getUserInfo(id: string) {
    // return this._http.get<{"userDTO": User}>(this._userURL + '/' + id);
    return this._http.get<any>(this._userURL + '/' + id);
  }

  // getSid() {
  //   return this._http.get<string>(environment.secondaryApi + 'GetSid');
  // }

}
