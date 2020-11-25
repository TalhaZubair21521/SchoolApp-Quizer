import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.css']
})
export class GameQuestionComponent implements OnInit {

  @ViewChild('popup1') popup1: ElementRef;
  @ViewChild('popup4') popup2: ElementRef;
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
  }

  onSubmit(formdata: NgForm) {
    for (var i = 0; i < this.questions.questions.length; i++) {
      if (this.questions.questions[i].activity === "game" && this.questions.questions[i].answer === "") {
        let value = "gameQ";
        if (i === 10) {
          value = value + "1";
        } else if (i === 11) {
          value = value + "2";
        } else if (i === 12) {
          value = value + "3";
        } else if (i === 13) {
          value = value + "4";
        } else if (i === 14) {
          value = value + "5";
        }
        value = value + "option4";
        this.questions.questions[i].answer = formdata.value[value]
      }
    }
    var flag = [true, true, true, true, true];
    var i = 0;
    this.questions.questions.forEach((question) => {
      if (question.activity === "game") {
        flag[i] = this.isSomethingEmpty(question);
        i++;
      }
    });
    console.log();

    if (flag[0] && flag[1] && flag[2] && flag[3] && flag[4]) {
      // console.table(this.questions.questions);
      this.dataService.addGameQuestions(this.questions).subscribe(
        (data) => {
          console.log(data);
          if (data["type"] === "success") {
            this.popup1.nativeElement.click();
          } else {
            alert("Server not Responding");
          }
        },
        (err) => {
          console.log(err)
        }
      )
    } else {
      this.popup2.nativeElement.click()

    }
  }

  isSomethingEmpty(question) {
    return (question.question !== "" && question.option1 !== "" && question.option2 !== "" && question.option3 !== "" && question.option4 !== "" && question.answer !== "");
  }
  changeAnswer() {
    console.log("Hello");

  }
}
