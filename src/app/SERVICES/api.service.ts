import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl: string ="http://localhost:3000"

  constructor(private http: HttpClient) { }

  getChats(): Observable<any>{
    return this.http.get(this.serverUrl + '/chats')
  }

  postChats(chat): Observable<any>{
    return this.http.post(this.serverUrl+'/chats', chat)
  }
  
  
  getImages() {
    return this.http.get(this.serverUrl + 'images')
  }


  getGroups(): Observable<any>{
    return this.http.get(this.serverUrl + '/status')
  }

  getusers(): Observable<any>{
    return this.http.get(this.serverUrl + '/username')
  }
  
  postGroups(chat): Observable<any>{
    return this.http.post(this.serverUrl+'/status', chat)
  }

  postSignIn(credentials): Observable<any>{
    return this.http.post(this.serverUrl+'/username/sign-in', credentials)
  }

  postSignUp(credentials): Observable<any>{
    return this.http.post(this.serverUrl+'/username/sign-up', credentials)
  }

  postResource(route:string, item): Observable<any>{
    return this.http.post(this.serverUrl+ route, item)
  }

  saveUser(user){
    localStorage.setItem('user', JSON.stringify(user))
  }
  getUser(){
    return localStorage.getItem('user')
  }
  isRegistered(): boolean{
    return localStorage.getItem('user')? true: false;
  }
  userLogOut(){
    return localStorage.removeItem('user')
  }

}