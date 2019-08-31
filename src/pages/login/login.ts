import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Platform } from 'ionic-angular';
import { Platform ,NavController, NavParams, AlertController, 
  LoadingController} from 'ionic-angular';
// import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { UserProvider } from '../../providers/user/user';
// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  apiUrlCurrent = "https://crownbus-ea.com/crownbus_api";
  inputData: any = {};
  public alertShown:boolean = false;
  constructor(public platform: Platform,
    public navParams: NavParams,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private _userProvider: UserProvider,
    // private toastCtrl: ToastController,
    private http: HttpClient) {
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
      this.http.post(this.apiUrlCurrent+"/login/", 
        this.inputData
      ).subscribe((response) => {
        console.log(response[0].error);        
        console.dir(response);
        this._userProvider.setUserDetails(response);
        if (response[0].error == undefined){
          console.log('--------no error---------------');          
          console.log(this.inputData);
          let alertstr = this.alertCtrl.create({
            title: 'Successful login!',
            message: "<b>Welcome " + response[0].Nome + "</b>",
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  load.dismiss();
                  // this.printer.disconnectBluetooth();                  
                },
              },
            ],
          });          
          alertstr.present();
          load.dismiss();
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
                  // this.printer.disconnectBluetooth();
                  /// this.navCtrl.push(HomePage,{userData: this.inputData});
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
              // console.log('Cancel clicked');
              // this.alertShown=false;
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
            //this.load.dismiss();
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
