import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the UserProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  username: string;
  sub_station: string;
  t_station: string;
  t_username: string;
  allocatedRegNo: string;
  nome: string;
  allocatedRouteCode: string;
  routecode: string;
  openbookref: any;
  depdate: any;
  listOfScheduledVehicles : any = [];

  constructor(public http: HttpClient) {
    //console.log('Hello UserProvider Provider');
  }
  setUserDetails(userData: any){
    console.log("setting up user ddetails");
    console.log(userData[0].sub_station);
    this.username = userData[0].Login;
    this.sub_station = userData[0].sub_station;
    this.t_username = userData[0].Nome;
    this.t_station = userData[0].t_station;
    this.nome = userData[0].Nome;

  }
  setllocatedVehicle (scheduleDetails: any){
    console.dir(JSON.stringify( scheduleDetails));
    console.log("==========scheduled vehicles==============>>>>>>");
    this.listOfScheduledVehicles = scheduleDetails ;
    this.allocatedRegNo = scheduleDetails[0].regno;
    this.allocatedRouteCode  = scheduleDetails[0].routecode;
    this.routecode = scheduleDetails[0].routecode;
    this.openbookref = scheduleDetails[0].openbookref;
    this.depdate =  scheduleDetails[0].depdate;
  }
}
