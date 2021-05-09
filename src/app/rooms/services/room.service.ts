import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment.prod";
import { Room } from "../../models/room.model";
import { Invitation } from "src/app/models/invitation.model";
import { Appointment } from "src/app/models/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private _roomsByGroupUrl = environment.apiEndpoint + 'group/';
  private _invitationUrl = environment.apiEndpoint + 'user/invitations/';

  constructor(private _http: HttpClient) { }

  get(groupId) {
    return this._http.get<{roomDTO: Room[]}>(environment.apiEndpoint + 'group/' + groupId + '/rooms');
  }

  getInvitations(userId: number) {
    return this._http.get<Invitation[]>(this._invitationUrl + userId);
  }

  getAppointments(groupId: number) {
    return this._http.get<{appointmentDTO: Appointment[]}>(environment.apiEndpoint + 'calendar/group/' + groupId);
  }

  getRoomHash(roomId) {

    const body = {
      user: JSON.stringify({
        firstname: localStorage.getItem('firstname'),
        lastname: localStorage.getItem('lastname'),
        id: localStorage.getItem('userId'),
        login: localStorage.getItem('login'),
        externalId: 1,
        externalType: null
      }),
      options: JSON.stringify({
        roomId: roomId,
        moderator: false,
        showAudioVideoTest: true,
      })
    };

    let form = new URLSearchParams();
    form.append('user', body.user);
    form.append('options', body.options);
    
    return this._http.post<any>(environment.apiEndpoint + 'user/hash', form.toString(), { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }) });
  }

}
