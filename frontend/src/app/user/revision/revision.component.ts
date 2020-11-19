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
  timer: any = 5;
  intialTimer: any = 5;
  constructor(private dataService: DataserviceService) {
  }

  ngOnInit(): void {
    this.dataService.getQuestions("revision", "1", "1", "1").subscribe(
      (data) => {
        this.questions = data["data"]["questions"];
        this.currentQuestion = this.questions[this.questionIndexCounter];
        this.questionIndexCounter++;
      },
      err => { console.log(err) }
    )

    this.myInterval(() => {
      this.intialTimer = this.intialTimer - 1;
    }, 1000, 5);

    this.myInterval(() => {
      this.intialTimer == null;
      this.timer = 5;
      this.currentQuestion = this.questions[this.questionIndexCounter];
      this.questionIndexCounter++;
      this.myInterval(() => {
        this.timer = this.timer - 1;
      }, 1000, 5);
    }, 5 * 1000, 5);
  }





















  myInterval(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {
      callback();
      if (++x === repetitions) {
        window.clearInterval(intervalID);
      }
    }, delay);
  }

}
