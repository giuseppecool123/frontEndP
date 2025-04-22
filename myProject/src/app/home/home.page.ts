import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton , IonIcon } from '@ionic/angular/standalone';
import { RouterLink, RouterModule } from '@angular/router'; // ✅ important

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton , IonIcon, RouterModule, RouterLink],
})
export class HomePage {
  constructor() {} 
}
