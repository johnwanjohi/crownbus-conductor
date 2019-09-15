import { Component } from '@angular/core';
// import { Platform } from 'ionic-angular';
import { Platform ,NavController, NavParams, AlertController,
  LoadingController} from 'ionic-angular';
// import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { UserProvider } from '../../providers/user/user';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
import { RoadcollectionProvider } from '../../providers/roadcollection/roadcollection';

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public get userProvider(): UserProvider {
    return this._userProvider;
  }
  public set userProvider(value: UserProvider) {
    this._userProvider = value;
  }
  apiUrlCurrent : any; // = "https://crownbus-ea.com/crownbus_api";
  inputData: any = {};
  public alertShown:boolean = false;
  constructor(public platform: Platform,
    public navParams: NavParams,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    public userService: LoginserviceProvider,
    private _userProvider: UserProvider ,
    public roadCollectionProvider: RoadcollectionProvider) {
      platform.ready().then(() => {
        //statusBar.styleDefault();
        //splashScreen.hide();
        platform.registerBackButtonAction(() => {
          if (this.alertShown==false) {
            this.exitConfirm();
          }
        }, 0)
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  loginUser(){
    if (this.inputData.username != undefined && this.inputData.password != undefined){
      let load = this.loadCtrl.create({
        content: 'Logingin...',
      });
      load.present();
      // this.http.post(this.apiUrlCurrent+"/login/",
      this.userService.login(
        this.inputData
      ).subscribe((response) => {
        console.log(response[0].error);
        console.dir(response);
        this._userProvider.setUserDetails(response);
        if (response[0].error == undefined){
          console.log('---1-----no error---------------');
          console.log(this.inputData);
          let alertstr = this.alertCtrl.create({
            title: 'Successful login!',
            message: "<b>Welcome " + response[0].Nome + "</b>",
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
          this.roadCollectionProvider.getAllocatedVehicle(response[0].Nome).subscribe((scheduledvehicle) =>{
              console.log("==============error==========>>>" ); //+ scheduledvehicle[0].error);
              console.dir(scheduledvehicle);
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
          this.navCtrl.push(DashboardPage,{userData: this.inputData,response: response});
        }else{
          console.log('----------error-------------')
          let alertstr = this.alertCtrl.create({
            title: 'Unsuccessful login!',
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
        }
      });
    } else{
      let alert = this.alertCtrl.create({
        title: 'Required',
        message: 'You must enter your password and user name.',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
       alert.present();
    }
  }
  exitConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you really want to Exit?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }
}
