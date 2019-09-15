import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { SelectSearchableComponent } from 'ionic-select-searchable';

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
  @ViewChild('selectVehicleSearch') selectComponent: SelectSearchableComponent;
  inputData: any = {};
  vehiclesToSelectData : any = [];
  username: string;
  selectedVehicle: string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UserProvider) {
    this.username = userProvider.username;
    this.selectedVehicle = userProvider.allocatedRegNo;
    this.vehiclesToSelectData = userProvider.listOfScheduledVehicles;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  vehicleSelected(event: {component: SelectSearchableComponent,value: any}){
    console.log('event',event)
  }
  selectVehicle(){
    console.log("===selected vehicle=====>>" + this.selectedVehicle);
  }
  onClose(){

  }
  onChange($event){
    console.log("vehicle selected" +$event.target.value);
  }
  navigateToHomePage() {
    this.navCtrl.push(HomePage);
  }
}
