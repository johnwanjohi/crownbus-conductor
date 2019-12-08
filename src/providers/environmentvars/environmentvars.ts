import { Injectable } from '@angular/core';
@Injectable()
export class EnvironmentvarsProvider {
  apiUrlCurrent = "https://crownbus-ea.com/crownbus_api";
  // apiUrlCurrent = "http://localhost/crownbus_api";
  constructor(){ // public http: HttpClient) {
    // console.log('Hello EnvironmentvarsProvider Provider');
  }
}
