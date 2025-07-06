import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';


declare var CallNumber: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})

export class AppComponent {
  
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.requestInitialPermissions();
    });
  }

  async requestInitialPermissions() {
    const locPerm = await Geolocation.requestPermissions();
    console.log('Location permission:', locPerm);

    const notifPerm = await PushNotifications.requestPermissions();
    if (notifPerm.receive === 'granted') {
      PushNotifications.register();
    }
    console.log('Notification permission:', notifPerm);

      // ✅ ✅ ✅ Add these listeners to capture your push token:
    PushNotifications.addListener('registration', (token) => {
      console.log('Device Push Token:', token.value);
      alert('Push Token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error:', error);
      alert('Push registration error: ' + JSON.stringify(error));
    });

     CallNumber.callNumber(
      () => console.log('CALL_PHONE permission requested.'),
      (err: any) => console.log('CALL_PHONE permission error:', err),
      '1234567890',
      true // true = use ACTION_CALL → triggers permission popup
    );
  }


  }

