import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  classID: Number;
  subjectID: Number;
  chapterID: Number;
  userID: Number;
  questions: any = null;
  play = false;
  timeLeft: number = 10;
  interval;
  count: number = 0;
  solutions: any = [];
  isError: Boolean = false;
  message: String = "";

  constructor(private dataService: DataserviceService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userID = params['userId'];
      this.classID = params['classId'];
      this.subjectID = params['subjectId'];
      this.chapterID = params['chapterId'];
    });
    this.dataService.getQuestions("test", this.classID, this.subjectID, this.chapterID, this.userID).subscribe(
      (data) => {
        this.questions = data["data"]["questions"];
        if (data['type'] === "fail") {
          this.message = data['data'];
          // console.log(this.message);
          this.isError = true;
        } else {
          // console.table(this.questions);
          this.CreateSolutions();
        }
      },
      err => { console.log(err) }
    )
  }

  ngOnInit(): void {
  }
  CreateSolutions() {
    this.questions.forEach((element) => {
      this.solutions.push({ questionID: element.questionID, answer: "" });
    });
  }
  handlePlay() {
    this.play = true;
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.count < 5) {
          this.count = this.count + 1;
          this.timeLeft = 10;
        }
        else {
          clearInterval(this.interval);
        }
      }
    }, 1000)
  }

  resetTimer(event) {
    if (this.count < 4) {
      this.solutions[this.count].answer = event.target.innerHTML;
      this.count = this.count + 1;
      this.timeLeft = 10;
    }
    else if (this.count == 4) {
      this.solutions[this.count].answer = event.target.innerHTML;
      this.count = this.count + 1;
      // console.table(this.solutions);
      clearInterval(this.interval);
      this.dataService.saveQuestions(this.solutions, this.userID, this.classID, this.subjectID, this.chapterID, "test").subscribe(
        (data) => {
          console.log(data);
          if (data["type"] === "success") {
            alert("Test Activity Result Saved");
          } else if (data["type"] === "fail") {
            this.message = data['data'];
            console.log(this.message);
            this.isError = true;
          }
        },
        (err) => { console.error(err) }
      )
    }
  }

}
