import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  inputData: any = {};
  username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
    this.username = userProvider.username;  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  navigateToHomePage() {
    this.navCtrl.push(HomePage);
  }
}
