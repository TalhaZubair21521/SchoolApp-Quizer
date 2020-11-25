import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {

  questions: any = null;
  currentQuestion: any = null;
  questionIndexCounter: any = 0;
  timer: any = 10;
  solutions: any = [];
  play: any = false;
  constructor(private dataService: DataserviceService) {
  }

  ngOnInit(): void {
  }

  handlePlay() {
    this.play = true;
    this.dataService.getQuestions("revision", "1", "1", "1").subscribe(
      (data) => {
        this.questions = data["data"]["questions"];
        console.log(this.questions);
        this.CreateSolutions();
        this.QuestionLoop();
      },
      err => { console.log(err) }
    )

    var x = 0;
    var intervalID = window.setInterval(() => {
      this.QuestionLoop();
      if (++x === 5) {
        window.clearInterval(intervalID);
      }
    }, 10000);
  }

  QuestionLoop() {
    var x = 0;
    var timerInterval = window.setInterval(() => {
      this.timer = this.timer - 1;
      if (++x === 10) {
        this.timer = 10;
        window.clearInterval(timerInterval);
      }
    }, 1000);
    this.currentQuestion = this.questions[this.questionIndexCounter];
    this.questionIndexCounter++;
    if (this.questionIndexCounter === 6) {
      this.questionIndexCounter = this.questionIndexCounter - 1;
      console.table(this.solutions);
      this.dataService.saveQuestions(this.solutions).subscribe(
        (data) => {
          console.log(data);
          if (data["type"] === "success") {
            alert("Revision Activity Result Saved");
          }
        },
        (err) => { console.error(err) }
      )
    }
  }
  CreateSolutions() {
    this.questions.forEach((element) => {
      this.solutions.push({ questionID: element.questionID, answer: "" });
    });
  }
  submitSolution(option) {
    this.solutions[this.questionIndexCounter - 1].answer = this.currentQuestion[option];
  }

}
