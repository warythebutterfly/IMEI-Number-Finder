import { Component } from '@angular/core';
import {Uid} from '@ionic-native/uid/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  device_id: any;

  constructor(private androidPermissions : AndroidPermissions, private uid : Uid) {
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
    //console.log(this.device_id)
    return this.uid.IMEI;
}
}
