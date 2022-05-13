import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/SERVICES/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {

  name: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";  
  image: any = [];

  constructor(private http: HttpClient, private api: ApiService, private router: Router, public alertController: AlertController) { }

  ngOnInit() { }

  onSubmit() {
    let obj ={
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,

    }
    this.api.postSignUp(obj).subscribe(res => {
      this.api.saveUser(res)
      this.router.navigateByUrl('/home', {replaceUrl: true})
    }, error=>{
      this.presentAlert("Login Failed", error.error.error)
    })


  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }




}