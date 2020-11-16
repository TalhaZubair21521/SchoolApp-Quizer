import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('video') video: ElementRef;
  @ViewChild('popup1') popup1: ElementRef;
  @ViewChild('popup2') popup2: ElementRef;
  @ViewChild('popup3') popup3: ElementRef;
  @ViewChild('popup4') popup4: ElementRef;
  @ViewChild('popup5') popup5: ElementRef;

  timecheck: any;
  answer: any;
  list: any = [];
  solutions: any = [];

  count = 0;
  t = [2, 4, 6, 8, 10]

  constructor(private dataService: DataserviceService) {
    this.dataService.getQuestions("video", "1", "1", "1").subscribe(
      (data) => {
        this.list = data["data"]["questions"];
      },
      err => { console.log(err) }
    )
  }

  ngOnInit(): void {
    this.quizInterval();
  }

  handleClick() {
    this.video.nativeElement.play();
  }

  quizInterval() {

    this.timecheck = setInterval(() => {
      var currenttime = Math.floor(this.video.nativeElement.currentTime);
      if (currenttime === this.t[this.count]) {
        this.video.nativeElement.pause();
        switch (this.count) {
          case 0: {
            this.popup1.nativeElement.click();
            this.count = this.count + 1;
            break;
          }
          case 1: {
            this.popup2.nativeElement.click();
            this.count = this.count + 1;
            break;
          }
          case 2: {
            this.popup3.nativeElement.click();
            this.count = this.count + 1;
            break;
          }
          case 3: {
            this.popup4.nativeElement.click();
            this.count = this.count + 1;
            break;
          }
          case 4: {
            this.popup5.nativeElement.click();
            clearInterval(this.timecheck);
            break;
          }
          default: {
            break;
          }
        }
      }

    }, 1000);
  }

  saveAnswser(questionNo, id) {
    // alert("Question" + questionNo + " : " + this.answer);
    this.solutions.push({ questionID: questionNo, answer: this.answer })
    if (questionNo === 5) {
      this.dataService.saveQuestions(this.solutions).subscribe(
        (data) => { console.log(data) },
        (err) => { console.log(err) }
      )
    }
  }

}
