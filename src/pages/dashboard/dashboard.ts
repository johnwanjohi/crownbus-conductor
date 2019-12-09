import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { RoadcollectionProvider } from '../../providers/roadcollection/roadcollection';

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
  names: string;
  selectedVehicle: string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UserProvider,private _userProvider: UserProvider ,public roadCollectionProvider: RoadcollectionProvider) {
    this.username = userProvider.username;
    this.names = userProvider.nome;
    this.selectedVehicle = userProvider.allocatedRegNo;
    this.vehiclesToSelectData = userProvider.listOfScheduledVehicles;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.roadCollectionProvider.getAllocatedVehicle( this.names).subscribe((scheduledvehicle) =>{
      console.log("==============error==========>>>" ); //+ scheduledvehicle[0].error);
      console.dir(JSON.stringify (scheduledvehicle));
      if (scheduledvehicle[0].error == undefined ){
        console.dir(scheduledvehicle[0]);
        console.log(" ====scheduled vehicle====== " + scheduledvehicle[0].regno );
        this._userProvider.setllocatedVehicle(scheduledvehicle);
       //  alert("Dear " + response[0].Nome + ", you have not yet been scheduled " + scheduledvehicle[0].regno  + " today." )
      }else{
       // alert("Dear " + response[0].Nome + ", you have not yet been scheduled any vehicle today." )
      }
    }
  );
  }
  resetVehicles(){
    this.roadCollectionProvider.getAllocatedVehicle( this.names).subscribe((scheduledvehicle) =>{
      console.log("==============error==========>>>" ); //+ scheduledvehicle[0].error);
      console.dir(JSON.stringify (scheduledvehicle));
      if (scheduledvehicle[0].error == undefined ){
        console.dir(scheduledvehicle[0]);
        console.log(" ====scheduled vehicle====== " + scheduledvehicle[0].regno );
        this._userProvider.setllocatedVehicle(scheduledvehicle);
       //  alert("Dear " + response[0].Nome + ", you have not yet been scheduled " + scheduledvehicle[0].regno  + " today." )
      }else{
       // alert("Dear " + response[0].Nome + ", you have not yet been scheduled any vehicle today." )
      }
    }
  );

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
    console.log("vehicle selected-----------------------------" + $event);

    this.roadCollectionProvider.getAllocatedVehicleOpenBookRef( $event).subscribe((scheduledvehicle) =>{
      console.log("==============error==========>>>" ); //+ scheduledvehicle[0].error);
      console.dir(JSON.stringify (scheduledvehicle));
      if (scheduledvehicle[0].error == undefined ){
        console.dir(scheduledvehicle[0]);
        console.log(" ====scheduled vehicle====== " + scheduledvehicle[0].regno );
        this._userProvider.setllocatedVehicle(scheduledvehicle);
       //  alert("Dear " + response[0].Nome + ", you have not yet been scheduled " + scheduledvehicle[0].regno  + " today." )
      }else{
       // alert("Dear " + response[0].Nome + ", you have not yet been scheduled any vehicle today." )
      }
    }
  );


    // console.log($event.target.value);
  }
  navigateToHomePage() {
    this.navCtrl.push(HomePage);
  }
}
