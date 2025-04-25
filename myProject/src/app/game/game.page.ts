import { Component, OnInit } from '@angular/core';//all the imports are from angular core
import { HttpClient } from '@angular/common/http';//importing http client to fetch the api data
import { Router } from '@angular/router';//importing router to navigate to high scores page
import { IonicModule } from '@ionic/angular';//importing ionic module to use ionic components
import { NgIf, NgFor, CommonModule } from '@angular/common';//importing common module to use ngif and ngfor directives
import { FormsModule } from '@angular/forms';//importing forms module to use ngmodel for two way data binding

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [
    IonicModule, // Import IonicModule for all Ionic components
    NgIf,
    NgFor,
    CommonModule, // Required for Angular pipes like 'date'
    FormsModule, // Required for [(ngModel)]
  ],
})
export class GamePage implements OnInit {
  categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 10, name: 'Books' },
    { id: 11, name: 'Film Knowledge' },
    //i can add more cattagories here example...
    { id: 12, name: 'Entertainment: Musics' },
  ];
  selectedCategory: number | null = null;
  selectedDifficulty: string | null = null;
  questions: any[] = [];
  currentQuestionIndex = 0;
  shuffledAnswers: string[] = [];
  score = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}
//start game by fetching the api
  startGame() {
    if (!this.selectedCategory || !this.selectedDifficulty) {
      alert('Please select a category and difficulty!');
      return;
    }

    const url = `https://opentdb.com/api.php?amount=10&category=${this.selectedCategory}&difficulty=${this.selectedDifficulty}&type=multiple`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.results && response.results.length > 0) {
          this.questions = response.results;
          this.currentQuestionIndex = 0;
          this.prepareQuestion();
        } else {
          alert('No questions found for the selected category and difficulty.');
        }
      },
      (error) => {
        console.error('Error fetching questions:', error);//errror handling
        alert('Failed to fetch questions. Please try again later.');
      }
    );
  }

  //prepare the question by shuffling the answers
  prepareQuestion() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.shuffledAnswers = this.shuffleArray([
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ]);
  }
//shufle array
  shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
//submit the answer and check if it is correct or not
  //if correct increase the score and move to next question or save the score and navigate to high scores page
  submitAnswer(answer: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      this.score++;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.prepareQuestion();
    } else {
      this.saveScore();
      alert(`Game Over! Your score: ${this.score}`);
      this.router.navigate(['/high-scores']);
    }
  }
//save the score in local storage
  saveScore() {
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({ score: this.score, date: new Date() });
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }
}