import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
   
  }

  getPosition() {
    this.locationService.getCurrentPosition().then(pos => {
      console.log('Lat:', pos.coords.latitude, 'Lng:', pos.coords.longitude);
    });
  }
  startWatching() {
    this.locationService.watchPosition(pos => {
      if (pos) {
        console.log('Live GPS:', pos.coords.latitude, pos.coords.longitude);
      } else {
        console.log('Position is null or error occurred.');
      }
    });
  }

}
