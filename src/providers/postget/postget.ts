import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentvarsProvider } from '../../providers/environmentvars/environmentvars';
@Injectable()
export class PostgetProvider {
  inputData : any;
  apiUrlCurrent: any;
  constructor(public http: HttpClient,public env : EnvironmentvarsProvider) {
    this.apiUrlCurrent = env.apiUrlCurrent;
  }
  postProp(_postData, endPoint: string){
    console.dir(_postData);
    this.inputData = _postData;
    return this.http.post( this.apiUrlCurrent + endPoint,
        this.inputData
    );
  }
  getProp(endPoint: string){
    console.log(endPoint);
    return this.http.get( this.apiUrlCurrent + endPoint,
        this.inputData
    );
  }
}
