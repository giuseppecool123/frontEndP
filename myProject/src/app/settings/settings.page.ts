import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class SettingsPage {
  toggleTheme: boolean = false; //Tracks dark mode state
  selectedColor: string = 'primary'; // Tracks the selected accent color

  constructor() {
    // Initialize dark mode state
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.toggleTheme = localStorage.getItem('toggleTheme') === 'true' || prefersDark;
    this.applyTheme();

    // Initialize accent color
    this.selectedColor = localStorage.getItem('accentColor') || 'primary';
    this.applyAccentColor();
  }

  toggleThemeMode() {
    this.toggleTheme = !this.toggleTheme;
    localStorage.setItem('toggleTheme', this.toggleTheme.toString());
    this.applyTheme();
  }

  applyTheme() {
    document.body.classList.toggle('dark', this.toggleTheme);
  }

  changeAccentColor() {
    localStorage.setItem('accentColor', this.selectedColor); // Save the selected color in localStorage
    this.applyAccentColor();
  }

  applyAccentColor() {
    document.body.setAttribute('color-theme', this.selectedColor); // Apply the selected color theme
  }

  resetHighScores() {
    if (confirm('Are you sure you want to reset high scores?')) {
      localStorage.removeItem('highScores');
      alert('High scores have been reset.');
    }
  }
}