import { Injectable } from '@angular/core';
import { UserProvider } from '../user/user';
import { PostgetProvider } from '../postget/postget';

@Injectable()
export class LoginserviceProvider {
  apiUrlCurrent: any;
  inputData: any;
  constructor(public _userProvider: UserProvider, public postGetService: PostgetProvider) {

  }
  login(_inputData: any) {
    this.inputData = _inputData;
    this.postGetService.postProp
    return this.postGetService.postProp(this.inputData,"/login/");
  }
}
