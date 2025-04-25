//compomnet for displayng high scores
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.page.html',
  styleUrls: ['./high-scores.page.scss'],
  standalone: true,
  imports: [
    IonicModule, // Import IonicModule to include all Ionic components
    NgFor,
    CommonModule, // Required for the date pipe
  ],
})
export class HighScoresPage implements OnInit {
  highScores: any[] = [];//storibg the high scores in an array

  ngOnInit() {
    this.highScores = JSON.parse(localStorage.getItem('highScores') || '[]'); //load the scores from the local storage
  }
}