import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/SERVICES/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})

export class SignInPage implements OnInit {
  email: string = "";
  password: string = "";
  err: string = "";

  constructor(private http: HttpClient, private api: ApiService, private router: Router, public alertController: AlertController) { }

  ngOnInit() { }

  onSubmit() {
    let credentials = {
      email: this.email,
      password: this.password
    }
    this.api.postSignIn(credentials)
    .subscribe(res => {
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