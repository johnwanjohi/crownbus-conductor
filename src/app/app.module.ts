import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'
import { PrinterProvider } from './../providers/printer/printer';
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { UserProvider } from '../providers/user/user';
import { RoadcollectionProvider } from '../providers/roadcollection/roadcollection';
import { EnvironmentvarsProvider } from '../providers/environmentvars/environmentvars';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { PostgetProvider } from '../providers/postget/postget';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BluetoothSerial,
    PrinterProvider,
    UserProvider,
    RoadcollectionProvider,
    EnvironmentvarsProvider,
    LoginserviceProvider,
    PostgetProvider
  ]
})
export class AppModule {}
