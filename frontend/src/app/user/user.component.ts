import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('video') video: ElementRef;
  @ViewChild('popup') popup: ElementRef;

  private questions: Object;

  constructor(private dataService: DataserviceService) {
    this.dataService.getQuestions("video", "1", "1", "1").subscribe(
      (data) => {
        this.questions = data["data"]["questions"];
        console.table(this.questions);
      },
      err => { console.log(err) }
    )
  }

  timecheck;

  ngOnInit(): void {
    this.timecheck = setInterval(() => {
      var currenttime = Math.floor(this.video.nativeElement.currentTime);
      if (currenttime === 5) {
        clearInterval(this.timecheck);
        this.video.nativeElement.pause();
        this.popup.nativeElement.click();
        // this.video.nativeElement.play();
      }
    }, 1000);

  }

  handleClick() {
    this.video.nativeElement.play();
    console.log("this.video.nativeElement.currentTime");
    // clearInterval(this.id);
  }

}
