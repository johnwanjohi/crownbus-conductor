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
  t_username: string;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  setUserDetails(userData: any){
    console.log("setting up user ddetails");
    console.log(userData[0].sub_station);
    this.username = userData[0].Login;
    this.sub_station = userData[0].sub_station;
    this.t_username = userData[0].Nome;
  }
}
