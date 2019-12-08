import { Injectable } from '@angular/core';
import { PostgetProvider } from '../postget/postget';
@Injectable()
export class RoadcollectionProvider {
  inputData : any;
  constructor( public postGetService: PostgetProvider) {
  }
  getAllocatedVehicle(_inputData: any) {
    this.inputData = _inputData;
    // this.postGetService.postProp
    console.log("Conductor names ====== " + _inputData);
    return this.postGetService.getProp("/roadcollection/?action=getallocatedvehicle&conductor="+_inputData);
  }
  getFromToTown(_inputData?: any) {
    this.inputData = _inputData;
    // this.postGetService.postProp
    console.log("getting from to town ====== " + _inputData);
    return this.postGetService.getProp("/roadcollection/?action=getfromtotown&conductor="+_inputData);
  }
  createReceipt(_inputData: any) {
    console.dir("creating receipt data" + _inputData);
    console.dir(JSON.stringify( _inputData));
    console.log('creating receipt!!!!!!!!!!' + _inputData);
    this.inputData = _inputData;
    // this.postGetService.postProp
    return this.postGetService.postProp(this.inputData,"/roadcollection/?action=CreateRoadCollection");
  }
}
