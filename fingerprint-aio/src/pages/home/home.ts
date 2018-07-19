import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fingerprintOptions: FingerprintOptions

  constructor(private alertCtrl: AlertController, private fingerprint: FingerprintAIO, private platform: Platform) {
      this.fingerprintOptions = {
        clientId: 'fingerprint-bbta',
        clientSecret: 'password', //Only necessary for Android
        disableBackup: true, //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please authenticate' //Only for iOS
      }
  }

  async showFingerprintDialog(){
    try{
      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      //console.log(available);

      if(available == "finger"){
        //const result = await this.fingerprint.show(this.fingerprintOptions);
        this.fingerprint.show(this.fingerprintOptions)
        .then((result: any) => {
          this.presentAlert('OK: '+result);
        })
        .catch((error: any) => {
          this.presentAlert('E: '+error);
        });

        //console.log(result);
        //this.presentAlert('R: '+result);
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
