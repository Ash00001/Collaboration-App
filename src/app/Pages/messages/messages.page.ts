import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/SERVICES/api.service';
import { PusherService } from 'src/app/SERVICES/pusher.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  data: any;
  chat: string = '';
  user: any;
  name: string="";
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, 
    private pusher: PusherService) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
      this.data =this.router.getCurrentNavigation().extras.state.chat;
      console.log('data ', this.data)
      }
    })
    this.user = JSON.parse(this.api.getUser())

   }

  ngOnInit() {
    this.pusher.subscribeToChannel('message', ['inserted'], (data)=>{
      console.log("are you getting anything ", data)
      this.data.messages.push(data)
    })
    console.log(this.data)
    if(this.data.from==this.user._id){
      this.name=this.data.name
    }
    else{
      this.api.getusers()
      .subscribe(res=>{
        for (let i of res){
          if(this.data.from==i._id){
            this.name=i.name
          }
        }
      })
    }
  }

  postMessage(){

    let obj ={
      message: this.chat,
      from: this.user._id,
      chat_id: this.data._id,
      time: Date.now()
    }
    console.log('obj ', obj)
    this.api.postResource('/messages', obj)
    .subscribe(resp=>{
      console.log(resp);
      this.chat =''
    })

  }
  unsubscribe(){
    this.pusher.unsubscribe('message')
  }

}