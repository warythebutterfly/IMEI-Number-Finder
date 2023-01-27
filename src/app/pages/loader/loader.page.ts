import { Component, OnInit } from '@angular/core';
import {Uid} from '@ionic-native/uid/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})



export class LoaderPage implements OnInit {
  device_id: any;
  constructor(private androidPermissions : AndroidPermissions, private uid : Uid) { }

  ngOnInit() {

    //console.log(cordova.plugins.uid.IMEI);
    this.getIMEI();
   
  }
  async getIMEI() {
    const {hasPermission} = await this.androidPermissions.checkPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
    if (!hasPermission) {
        const result = await this.androidPermissions.requestPermission(
            this.androidPermissions.PERMISSION.READ_PHONE_STATE
        );
        if (!result.hasPermission) {
            throw new Error ('Permissions required');
        }
        // ok, a user gave us permission, we can get identifiers after restart the application
        return 0;
    }
    this.device_id = this.uid.IMEI
    return this.uid.IMEI;
}

}
