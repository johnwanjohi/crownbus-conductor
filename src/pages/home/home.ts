import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,NavParams,
  ToastController,
} from 'ionic-angular';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import { UserProvider } from '../../providers/user/user';
import { RoadcollectionProvider } from '../../providers/roadcollection/roadcollection';
// import { DashboardPage } from '../dashboard/dashboard';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  receipt: any;
  inputData: any = {};
  // inputData2: any = [];
  t_username: any;
  condMobileNumber: any;
  savedReceipt: any;
  constructor(
    public navCtrl: NavController,
    private printer: PrinterProvider,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public roadCollectionService: RoadcollectionProvider
  ) {
    // console.dir(this.navParams.data.userData.username)
    // alert(this.navParams.data.response[0].Nome);
    this.t_username = userProvider.t_username;
    this.inputData.reg_no = userProvider.allocatedRegNo;
    this.inputData.depdate = userProvider.depdate;
    this.inputData.openbookref = userProvider.openbookref
    this.inputData.routecode = userProvider.routecode;
    this.inputData.regno = userProvider.allocatedRegNo;
    this.inputData.t_username = userProvider.t_username;
    this.inputData.sub_station = userProvider.sub_station;
    this.inputData.t_station = userProvider.t_station;
    this.inputData.conductor_road = userProvider.t_username;
    this.inputData.conductor = userProvider.t_username;
    this.inputData.conductor_road = userProvider.t_username;
    this.inputData.bookdate = userProvider.depdate;

    console.log(" >====================< allocated vehicle "+ userProvider.allocatedRegNo);
    console.log(" >====================< allocated bookdate "+ userProvider.depdate);
    console.log(" >====================< allocated openbookref "+ userProvider.openbookref);
    console.log(" >====================< allocated routecode "+ userProvider.allocatedRouteCode);
  }

  showToast(data) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: data,
      position: 'bottom',
    });
    toast.present();
  }

  noSpecialChars(string) {
    var translate = {
        à: 'a',
        á: 'a',
        â: 'a',
        ã: 'a',
        ä: 'a',
        å: 'a',
        æ: 'a',
        ç: 'c',
        è: 'e',
        é: 'e',
        ê: 'e',
        ë: 'e',
        ì: 'i',
        í: 'i',
        î: 'i',
        ï: 'i',
        ð: 'd',
        ñ: 'n',
        ò: 'o',
        ó: 'o',
        ô: 'o',
        õ: 'o',
        ö: 'o',
        ø: 'o',
        ù: 'u',
        ú: 'u',
        û: 'u',
        ü: 'u',
        ý: 'y',
        þ: 'b',
        ÿ: 'y',
        ŕ: 'r',
        À: 'A',
        Á: 'A',
        Â: 'A',
        Ã: 'A',
        Ä: 'A',
        Å: 'A',
        Æ: 'A',
        Ç: 'C',
        È: 'E',
        É: 'E',
        Ê: 'E',
        Ë: 'E',
        Ì: 'I',
        Í: 'I',
        Î: 'I',
        Ï: 'I',
        Ð: 'D',
        Ñ: 'N',
        Ò: 'O',
        Ó: 'O',
        Ô: 'O',
        Õ: 'O',
        Ö: 'O',
        Ø: 'O',
        Ù: 'U',
        Ú: 'U',
        Û: 'U',
        Ü: 'U',
        Ý: 'Y',
        Þ: 'B',
        Ÿ: 'Y',
        Ŕ: 'R',
      },
      translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÝÝÞŸŔŔ]/gim;
    return string.replace(translate_re, function(match) {
      return translate[match];
    });
  }
  print(device, data) {
    // data.username = this.username;
    console.log('Device mac: ', device);
    console.log('Data: ', data);
    let load = this.loadCtrl.create({
      content: 'Printing....',
    });
    load.present();
    this.printer.connectBluetooth(device).subscribe(
      (status) => {
        console.log(status);
        this.printer
          .printData(this.noSpecialChars(data))
          .then((printStatus) => {
            console.log(printStatus);
            let alert = this.alertCtrl.create({
              title: 'Successful print!',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    load.dismiss();
                    this.printer.disconnectBluetooth();
                  },
                },
              ],
            });
            alert.present();
          })
          .catch((error) => {
            console.log(error);
            let alert = this.alertCtrl.create({
              title: 'There was an error printing, please try again!',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    load.dismiss();
                    //this.printer.disconnectBluetooth();
                  },
                },
              ],
            });
            alert.present();
          });
      },
      (error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title:
            'There was an error connecting to the printer, please try again!',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                load.dismiss();
              },
            },
          ],
        });
        alert.present();
      },
    );
  }

  prepareToPrint(_data: any) {
    // u can remove this when generate the receipt using another method
    // new Date(year, month, day, hours, minutes, seconds, milliseconds);
    // let dateYr = new Date();
    let data: any;
    let title:any =  'CROWN BUS LTD';
    data = _data ;// await this.saveReceipt(_data);
    console.dir(_data);//.error
    console.log("============<<<<prepareToPrint<<<<<<<<<>>>>>>>>");
    console.dir(JSON.stringify(data));
    console.log("============<<<<<<<<prepareToPrint<<<<<**>>>>>>>>");
    // let data = dataSaved;
    // if (!dataSaved.title) {
      //data.title = 'Title';
    //}
    // if (!data.text) {
      //data.text =      'Lorem ipsum dolor sit amet, consectetur adipiscing mcorper lectus.';
    //}
    
    // data.username = this.t_username;
    // let date = dateYr.getFullYear + "-" + dateYr.getUTCMonth + "-" + dateYr.getUTCDay
    let receipt = '';
    receipt += commands.HARDWARE.HW_INIT;
    receipt += commands.TEXT_FORMAT.TXT_4SQUARE;
    receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
    receipt += title.toUpperCase();
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_NORMAL;
    receipt += commands.HORIZONTAL_LINE.HR_58MM;
    receipt += commands.EOL;
    receipt += commands.HORIZONTAL_LINE.HR2_58MM;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
    receipt += "Issue Date     " + data.transdate;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += "ID No.    Show ID ";
    receipt += commands.EOL;    
    receipt += commands.EOL;
    // receipt += data.passengernames;
    receipt += data.routecode;
    receipt += commands.EOL;
    receipt += data.reg_no;
    receipt += commands.EOL;
    receipt += "Serial No     " + data.ref;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON;
    receipt += "From   " + commands.TEXT_FORMAT.TXT_BOLD_OFF + data.fromtown;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + "To    " + commands.TEXT_FORMAT.TXT_BOLD_OFF + data.totown;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + "Amount      " ;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_OFF + data.amount + " KES";
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + "Thank you for choosing Crown Bus." ;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + commands.TEXT_FORMAT.TXT_ITALIC_ON + "Cash once paid is NOT refundable or transferable." ;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + commands.TEXT_FORMAT.TXT_ITALIC_OFF ;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + "You were served by " ;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + commands.TEXT_FORMAT.TXT_ITALIC_ON + data.t_username; // "John Wanjohi" ;
    receipt += commands.EOL;
    receipt += commands.TEXT_FORMAT.TXT_BOLD_ON + commands.TEXT_FORMAT.TXT_ITALIC_ON + data.received_time;
    //secure space on footer
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.EOL;
    receipt += commands.EOL;
    //this.receipt = receipt;
    // if (dataSaved == true){
      this.mountAlertBt(receipt);
    // }else{
      console.log("data not saved");
    //}

  }
  mountAlertBt(data) {
    this.receipt = data;
    let alert = this.alertCtrl.create({
      title: 'Select your printer',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Select printer',
          handler: (device) => {
            if (!device) {
              this.showToast('Select a printer!');
              return false;
            }
            console.log(device);
            this.print(device, this.receipt);
          },
        },
      ],
    });
    this.printer
      .enableBluetooth()
      .then(() => {
        this.printer
          .searchBluetooth()
          .then((devices) => {
            devices.forEach((device) => {
              console.log('Devices: ', JSON.stringify(device));
              alert.addInput({
                name: 'printer',
                value: device.address,
                label: device.name,
                type: 'radio',
              });
            });
            alert.present();
          })
          .catch((error) => {
            console.log(error);
            this.showToast(
              'There was an error connecting the printer, please try again!',
            );
            this.mountAlertBt(this.receipt);
          });
      })
      .catch((error) => {
        console.log(error);
        this.showToast('Error activating bluetooth, please try again!');
        this.mountAlertBt(this.receipt);
      });
  }
  saveReceipt(_inputData: any) :any{
    console.log('>>=====saveReceipt===========>>>>');
    this.inputData = _inputData;
    console.dir("somedata"+  JSON.stringify( _inputData));
    console.log('>>================>>>>');
    // if (this.inputData.username != undefined && this.inputData.password != undefined){
      let load = this.loadCtrl.create({
        content: 'Generating ticket...',
      });
      // load.present();
      // this.http.post(this.apiUrlCurrent+"/login/",
      this.roadCollectionService.createReceipt(
        this.inputData
      ).subscribe((response) => {
        console.log("saved receipt finally receipt response");
        console.dir(JSON.stringify(response));
        console.dir(JSON.stringify(response[0]));
        // this._userProvider.setUserDetails(response);
        if (response[0].error == undefined){
          this.savedReceipt = response;
          console.log('--------no error--------------');
          console.log(this.inputData);
          let alertstr = this.alertCtrl.create({
            title: 'Successful generation of receipt!!',
            message: "<b>Proceeding to printing</b>",
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                },
              },
            ],
          });
          alertstr.present();

          load.dismiss();
          // this.navCtrl.push(DashboardPage,{userData: this.inputData,response: response});
          this.prepareToPrint(response[0]);
          return response[0];
        }else{
          console.log('----------error------------')
          let alertstr = this.alertCtrl.create({
            title: 'Unsuccessful generation of receipt!',
            message: response[0].error,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                },
              },
            ],
          });
          alertstr.present();
          load.dismiss();
          return response[0];
        }
      });
    }
}
