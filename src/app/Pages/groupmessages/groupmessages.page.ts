import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/SERVICES/api.service';
import { PusherService } from 'src/app/SERVICES/pusher.service';

@Component({
  selector: 'app-messages',
  templateUrl: './groupmessages.page.html',
  styleUrls: ['./groupmessages.page.scss'],
})
export class GroupmessagesPage implements OnInit {
  data: any;
  chat: string = '';
  user: any;
  ids: Array<string> = [];
  names = new Map<string, string>();
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

    for ( let i of this.data.messages){
      //console.log("data", this.data.messages)
      this.ids.push(i.from)
      
    }
    console.log(this.ids)
    this.api.getusers()
    .subscribe(res=>{
      //console.log(res)
      for (let j of res){
        for (let k of this.ids){
          //console.log(k)
          if(k==j._id){
            this.names.set(k, j.name)
          }
        }
      }
      console.log("names =", this.names)
    }
  )

  }

  postGroupmessage(){

    let obj ={
      message: this.chat,
      from: this.user._id,
      groups_id: this.data._id,
      time: Date.now()
    }
    console.log('obj ', obj)
    this.api.postResource('/groupmessages', obj)
    .subscribe(resp=>{
      console.log(resp)
      this.chat =''
    })
  }
  unsubscribe(){
    this.pusher.unsubscribe('message')
  }

}