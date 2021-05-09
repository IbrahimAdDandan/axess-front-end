import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment.prod";
import { Group } from "../../models/group.model";


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private _Url = environment.secondaryApi + 'Groups/';
  private _OPUrl = environment.apiEndpoint;

  constructor(private _http: HttpClient) { }

  get() {
    return this._http.get<{groupDTO: Group[]}>(this._OPUrl + 'group/');
  }

  getUserGroups(id: number) {
    return this._http.get<{groupDTO: Group[]}>(this._OPUrl + 'user/groups/' + id);
  }

  getOtherGroups(id: number) {
    return this._http.get<Group[]>(this._Url + 'OtherGroups/' + id);
  }

  joinGroup(groupId: number) {
    debugger;
    const userId = localStorage.getItem('userId');
    return this._http.post<any>(this._OPUrl + 'group/' + groupId + '/users/' + userId, null);
  }

}
