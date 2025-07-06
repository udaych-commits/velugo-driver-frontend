import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

   async requestPermission() {
    return await Geolocation.requestPermissions();
  }
   async getCurrentPosition(): Promise<Position> {
    return await Geolocation.getCurrentPosition();
  }
    async watchPosition(callback: (position: Position | null) => void) {
    return Geolocation.watchPosition({}, callback);
  }
  async stopWatch(watchId: string) {
  return Geolocation.clearWatch({ id: watchId });
}

}
