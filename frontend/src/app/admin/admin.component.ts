import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  file: File;
  videoSrc;
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
      { activity: "test", type: "true/false", question: "", option1: "true", option2: "false", option3: "noOption", option4: "noOption", answer: "", skill: "Application" },
      { activity: "test", type: "oneword", question: "", option1: "noOption", option2: "noOption", option3: "noOption", option4: "noOption", answer: "", skill: "Analysis" },
      { activity: "test", type: "oneword", question: "", option1: "noOption", option2: "noOption", option3: "noOption", option4: "noOption", answer: "", skill: "Observation" }
    ]
  };
  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
  }
  onSubmit(formdata: NgForm) {
    if (!this.videoSrc) {
      alert("No Video Selected !!");
    } else {
      var flag = true;
      this.questions.questions.forEach((question) => {
        flag = !this.isSomethingEmpty(question);
      });
      if (flag) {
        var data = new FormData();
        data.append('video', this.file);
        data.append('questions', this.questions);
        this.dataService.addQuestions(this.questions).subscribe(
          (data) => {
            if (data["type"] === "success") {
              alert("Data Saved Successfully");
            } else {
              alert("Error Occured");
            }
          },
          (err) => { console.log(err) }
        )
      } else {
        alert("Fill all Fields");
      }
    }
  }

  isSomethingEmpty(question) {
    return (question.question === "" || question.answer === "" || question.option1 === "" || question.option2 === "" || question.option3 === "" || question.option4 === "");
  }

  onFileSelected($event) {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.videoSrc = reader.result;
    reader.readAsDataURL(this.file);
  }

}
