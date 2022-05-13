import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/SERVICES/api.service';
import { PusherService } from 'src/app/SERVICES/pusher.service';

@Component({
  selector: 'app-chats',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  chats: any;
  chat: string = '';
  user: any;
  arraychat: Array<string> = [];
  constructor(private navCtl: NavController, private route: ActivatedRoute, private router: Router, private api: ApiService, 
    private pusher: PusherService) {
    this.user = JSON.parse(this.api.getUser())
   }

  ngOnInit() {
    this.getAllGroups()
  }
  
  selectGroup(c){
    let navigationExtra: NavigationExtras ={
      state:{
        chat: c
      }
    }
  
    this.navCtl.navigateForward('groupmessages', navigationExtra)
  }

  getAllGroups(){
    this.api.getGroups()
    .subscribe(resp=> {
      for (let j of resp){
        for (let i of j.user_id){
          if(i==this.user._id){
            this.arraychat.push(j)
          }
        }
      }
      this.chats = this.arraychat
    })
  }

  getLastMessage(index){

    this.chats.messages = this.chats[index].messages;
    if(this.chats.messages.length == 0) return ''
     return this.chats.messages[this.chats.messages.length-1].message 
   

  }


}