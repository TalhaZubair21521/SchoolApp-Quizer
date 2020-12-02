import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-revision-question',
  templateUrl: './revision-question.component.html',
  styleUrls: ['./revision-question.component.css']
})
export class RevisionQuestionComponent implements OnInit {
  @ViewChild('popup1') popup1: ElementRef;
  @ViewChild('popup4') popup2: ElementRef;
  @ViewChild('popup5') popup3: ElementRef;
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
      (error) => { console.log(error) })
  }
  onSubmit(formdata: NgForm) {
    for (i = 0; i < this.questions.questions.length; i++) {
      if (this.questions.questions[i].activity === "revision" && this.questions.questions[i].answer === "") {
        let value = "revisionQ";
        if (i === 5) {
          value = value + "1";
        } else if (i === 6) {
          value = value + "2";
        } else if (i === 7) {
          value = value + "3";
        } else if (i === 8) {
          value = value + "4";
        } else if (i === 9) {
          value = value + "5";
        }
        value = value + "option4";
        this.questions.questions[i].answer = formdata.value[value]
      }
    }
    var flag = [true, true, true, true, true];
    var i = 0;
    this.questions.questions.forEach((question) => {
      if (question.activity === "revision") {
        flag[i] = this.isSomethingEmpty(question);
        i++;
      }
    });
    // console.log(this.questions.questions);
    if (flag[0] && flag[1] && flag[2] && flag[3] && flag[4]) {
      this.dataService.addRevisionQuestions(this.questions).subscribe(
        (data) => {
          // console.log(data);
          if (data["type"] === "success") {
            this.popup1.nativeElement.click();
          } else if (data["type"] === "fail") {
            this.popup3.nativeElement.click();
          } else {
            alert("Server Not Responding");
          }
        },
        (err) => {
          alert("Server Not Responding");
        }
      )
    } else {
      this.popup2.nativeElement.click()
    }
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
  isSomethingEmpty(question) {
    return (question.question !== "" && question.option1 !== "" && question.option2 !== "" && question.option3 !== "" && question.option4 !== "" && question.answer !== "");
  }
}
