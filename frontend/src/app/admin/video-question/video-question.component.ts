import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-video-question',
  templateUrl: './video-question.component.html',
  styleUrls: ['./video-question.component.css']
})
export class VideoQuestionComponent implements OnInit {
  @ViewChild('popup1') popup1: ElementRef;
  @ViewChild('popup2') popup2: ElementRef;
  @ViewChild('popup3') popup3: ElementRef;
  @ViewChild('popup4') popup4: ElementRef;
  @ViewChild('popup5') popup5: ElementRef;
  file: File;
  videoSrc;
  classes = [];
  subjects = [];
  chapters = [];
  questions: any = {
    class: "1",
    subject: "1",
    chapter: "1",
    questions: [
      { activity: "video", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Reading" },
      { activity: "video", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Observation" },
      { activity: "video", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Listening" },
      { activity: "video", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Writing" },
      { activity: "video", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Learning" },

      { activity: "revision", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Reading" },
      { activity: "revision", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Observation" },
      { activity: "revision", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Listening" },
      { activity: "revision", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Writing" },
      { activity: "revision", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Learning" },

      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Reading" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Observation" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Listening" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Writing" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "Learning" },

      { activity: "test", type: "true/false", question: "", option1: "true", option2: "false", option3: "noOption", option4: "noOption", answer: "", skill: "Memory" },
      { activity: "test", type: "true/false", question: "", option1: "true", option2: "false", option3: "noOption", option4: "noOption", answer: "", skill: "Conceptual" },
      { activity: "test", type: "true/false", question: "", option1: "true", option2: "false", option3: "noOption", option4: "noOption", answer: "rue", skill: "Application" },
      { activity: "test", type: "oneword", question: "", option1: "noOption", option2: "noOption", option3: "noOption", option4: "noOption", answer: "", skill: "Analysis" },
      { activity: "test", type: "oneword", question: "", option1: "noOption", option2: "noOption", option3: "noOption", option4: "noOption", answer: "", skill: "Observation" }
    ]
  };
  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
    this.dataService.getClasses().subscribe(
      (data) => {
        this.classes = data["result"];
        // console.table(this.classes);

      },
      (error) => { console.log(error) }
    )
  }

  onSubmit(formdata: NgForm) {
    if (!this.videoSrc) {
      this.popup3.nativeElement.click();
    } else {
      const size = this.file.size / 1000000;
      if (size > 15) {
        this.popup2.nativeElement.click();
      } else {

        for (var i = 0; i < this.questions.questions.length; i++) {
          if (this.questions.questions[i].activity === "video" && this.questions.questions[i].answer === "") {
            let value = "videoQ";
            if (i === 0) {
              value = value + "1";
            } else if (i === 1) {
              value = value + "2";
            } else if (i === 2) {
              value = value + "3";
            } else if (i === 3) {
              value = value + "4";
            } else if (i === 4) {
              value = value + "5";
            }
            value = value + "option4";
            this.questions.questions[i].answer = formdata.value[value]
          }
        }
        var flag = [true, true, true, true, true];
        var i = 0;
        this.questions.questions.forEach((question) => {
          if (question.activity === "video") {
            flag[i] = this.isSomethingEmpty(question);
            i++;
          }
        });
        if (flag[0] && flag[1] && flag[2] && flag[3] && flag[4]) {
          var data = new FormData();
          data.append('video', this.file);
          data.append('data', JSON.stringify(this.questions));
          this.dataService.addVideoQuestions(data).subscribe(
            (data) => {
              console.log(data);
              if (data["type"] === "success") {
                this.popup1.nativeElement.click();
              } else if (data["type"] === "fail") {
                this.popup5.nativeElement.click();
              } else {
                alert("Server Not Responding");
              }
            },
            (err) => {
              alert("Server Not Responding");
            }
          )
        } else {
          this.popup4.nativeElement.click();
        }
      }
    }
  }
  isSomethingEmpty(question) {
    return (question.question !== "" && question.option1 !== "" && question.option2 !== "" && question.option3 !== "" && question.option4 !== "" && question.answer !== "");
  }
  getSubjects(classId) {
    this.dataService.getSubjects(classId).subscribe(
      (data) => {
        console.log(data);
        this.subjects = data["result"];
      },
      (error) => { console.log(error) }
    )
  }
  getChapters(classId, subjectId) {
    this.dataService.getChapters(classId, subjectId).subscribe(
      (data) => {
        console.log(data);
        this.chapters = data["result"];
      },
      (error) => { console.log(error) }
    )
  }
  update() {
    this.getSubjects(this.questions.class);
    this.getChapters(this.questions.class, this.questions.subject);
  }
  updateSubject() {
    // console.log("Subjects", this.questions.subject);
    this.getChapters(this.questions.class, this.questions.subject);
  }
  onFileSelected($event) {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.videoSrc = reader.result;
    reader.readAsDataURL(this.file);
  }
}
