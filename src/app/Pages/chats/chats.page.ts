import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/SERVICES/api.service';
import { PusherService } from 'src/app/SERVICES/pusher.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chats: any;
  chat: string = '';
  user: any;
  arraychat: Array<string> = [];
  names = new Map<string, string>();
  constructor(private navCtl: NavController, private route: ActivatedRoute, private router: Router, private api: ApiService, 
    private pusher: PusherService) {
    this.user = JSON.parse(this.api.getUser())
   }

  ngOnInit() {
    this.getAllChats()
  }
  
  selectChat(c){
    let navigationExtra: NavigationExtras ={
      state:{
        chat: c
      }
    }
  
    this.navCtl.navigateForward('messages', navigationExtra)
  }

  getAllChats(){
    this.api.getChats()
    .subscribe(resp=> {
      for ( let i of resp){
        if(i.from==this.user._id || i.to==this.user._id){
          this.arraychat.push(i)
          if(i.from==this.user._id){
          this.names.set(i.name,this.user.name)
          }else{
            this.api.getusers()
            .subscribe(res=>{
              for (let j of res){
                if(i.from==j._id){
                  this.names.set(i.name, j.name)
                }
              }
            })
            
          }
        }
      }
      console.log(this.names)
      console.log(this.user.name)
      this.chats = this.arraychat
      console.log("chats", this.chats)
    })
  }

  getLastMessage(index){

    this.chats.messages = this.chats[index].messages;
    if(this.chats.messages.length == 0) return ''
     return this.chats.messages[this.chats.messages.length-1].message 
   

  }

}