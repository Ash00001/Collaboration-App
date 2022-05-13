import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/SERVICES/api.service';
declare var jQuery: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  name: string = "";
  persons: string = "";
  ids: Array<string> = [];

  constructor(private http: HttpClient, private api: ApiService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {

   }

  onSubmit() {
    console.log(this.persons)
    var lines = this.persons.split("\n")
    console.log(lines)
    this.api.getusers()
    .subscribe(res=>{
      console.log(res)
      for (let i of res){
        for (let j of lines){
          if(j==i.email){
            this.ids.push(i._id)
          }
        }
      }
      let obj ={
        name: this.name,
        user_id: this.ids
      }
      console.log(this.ids)
      console.log('obj ', obj)
      this.api.postGroups(obj)
      .subscribe(resp=>{
        console.log(resp);
      })      
    })
  }

  async presentAlert(header: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


}
