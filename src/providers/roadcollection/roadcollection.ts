import { Injectable } from '@angular/core';
import { PostgetProvider } from '../postget/postget';
@Injectable()
export class RoadcollectionProvider {
  inputData : any;
  constructor( public postGetService: PostgetProvider) {

  }
  getAllocatedVehicle(_inputData: any) {
    this.inputData = _inputData;
    this.postGetService.postProp
    return this.postGetService.postProp(this.inputData,"/roadcollection/?action=getallocatedvehicle");
  }
  createReceipt(_inputData: any) {
    this.inputData = _inputData;
    this.postGetService.postProp
    return this.postGetService.postProp(this.inputData,"/roadcollection/?action=getallocatedvehicle");
  }
}
