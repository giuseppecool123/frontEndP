import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, RouterModule } from '@angular/router';
import { Network } from '@capacitor/network'; // Import the Network plugin

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, RouterModule, RouterLink],
})
export class HomePage {
  networkStatus: string = ''; // Add this property to store the network status

  constructor() {
    this.checkNetworkStatus(); // Call the method to check network status on page load
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus(); // Get the current network status
    this.networkStatus = status.connected ? 'Online' : 'Offline'; // Update the network status
    console.log('Network Status:', this.networkStatus); // Log the status for debugging
  }
}