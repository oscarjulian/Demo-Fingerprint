import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AlertController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  fingerprintOptions: FingerprintOptions

  constructor(private alertCtrl: AlertController, private fingerprint: FingerprintAIO, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //FingerPrint
      this.fingerprintOptions = {
        clientId: 'fingerprint-bbta',
        clientSecret: 'password', //Only necessary for Android
        disableBackup: true, //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please authenticate' //Only for iOS
      }
      this.showFingerprintDialog();
    });

  }
  async showFingerprintDialog(){
    try{
      const available = await this.fingerprint.isAvailable();

      if(available == "finger"){
        this.fingerprint.show(this.fingerprintOptions)
        .then((result: any) => {
          this.presentAlert('OK: '+JSON.stringify(result));
        })
        .catch((error: any) => {
          this.presentAlert('E: '+error);
        });
      }
    }catch(e){
      console.error(e);
      this.presentAlert(e);
    }
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'FingerPrint',
      subTitle: 'Msg: '+msg,
      buttons: ['OK']
    });
    alert.present();
  }
}

