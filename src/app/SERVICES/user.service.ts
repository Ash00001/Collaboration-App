import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: {
    fullName: '',
    email: '',
    password: ''
  };
  serverUrl: string ="http://localhost:3000"
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  getChats(): Observable<any>{
    return this.http.get(this.serverUrl + '/chats')
  }
  
  postUser(user): Observable<any>{
    return this.http.post(this.serverUrl+'/sign-up',user,this.noAuthHeader);
  }

  login(authCredentials): Observable<any> {
    return this.http.post(this.serverUrl + '/sign-in', authCredentials,this.noAuthHeader);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(this.serverUrl + '/home');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}