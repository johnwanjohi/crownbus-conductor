import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, 
  LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  inputData: any = {};
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser(){
    let load = this.loadCtrl.create({
      content: 'Logingin...',
    });
    // load.present();

    let alert = this.alertCtrl.create({
      title: 'Successful login!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            // load.dismiss();
            // this.printer.disconnectBluetooth();
            this.navCtrl.push(HomePage,{userData: this.inputData});
          },
        },
      ],
    });
    alert.present();
  }

}
