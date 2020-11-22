import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataserviceService } from '../../services/dataservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('video') video: ElementRef;
  @ViewChild('popup1') popup1: ElementRef;
  @ViewChild('popup2') popup2: ElementRef;
  @ViewChild('popup3') popup3: ElementRef;
  @ViewChild('popup4') popup4: ElementRef;
  @ViewChild('popup5') popup5: ElementRef;

  videoURL: any = null;
  timecheck: any;
  answer1: any;
  answer2: any;
  answer3: any;
  answer4: any;
  answer5: any;
  list: any = [];
  solutions: any = [];

  duration: any;
  count = 0;
  t: any;

  constructor(private dataService: DataserviceService, private router: Router) {
    this.dataService.getQuestions("video", "1", "1", "1").subscribe(
      (data) => {
        this.list = data["data"]["questions"];
        this.videoURL = "http://localhost:1111/assets/videos/" + this.list[0].videoURL;
      },
      err => { console.log(err) }
    )
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.duration = this.video.nativeElement.duration;
      let interval = Math.floor(this.duration / 5);
      this.t = [interval, interval * 2, interval * 3, interval * 4, interval * 5];
      // console.log(this.t);
      this.quizInterval();
    }, 1000)

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
    switch (questionNo) {
      case 1:
        console.log(questionNo, this.answer1);
        this.solutions.push({ questionID: questionNo, answer: this.answer1 })
        break;
      case 2:
        console.log(questionNo, this.answer2);
        this.solutions.push({ questionID: questionNo, answer: this.answer2 })
        break;
      case 3:
        console.log(questionNo, this.answer3);
        this.solutions.push({ questionID: questionNo, answer: this.answer3 })
        break;
      case 4:
        console.log(questionNo, this.answer4);
        this.solutions.push({ questionID: questionNo, answer: this.answer4 })
        break;
      case 5:
        console.log(questionNo, this.answer5);
        this.solutions.push({ questionID: questionNo, answer: this.answer5 })
        break;
      default:
        break;
    }
    if (questionNo === 5) {
      this.dataService.saveQuestions(this.solutions).subscribe(
        (data) => {
          console.log(data);
          if (data["type"] === "success") {
            alert("Video Activity Result Saved");
            this.router.navigate(['user/revision']);
          }
        },
        (err) => { console.log(err) }
      )
    }
    this.video.nativeElement.play();
  }

}
