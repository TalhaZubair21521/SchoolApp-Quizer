import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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

      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "reading" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "observation" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "listening" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "writing" },
      { activity: "game", type: "mcqs", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "learning" },

      { activity: "test", type: "oneword", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "memory" },
      { activity: "test", type: "oneword", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "conceptual" },
      { activity: "test", type: "true/false", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "application" },
      { activity: "test", type: "true/false", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "analysis" },
      { activity: "test", type: "true/false", question: "", option1: "", option2: "", option3: "", option4: "", answer: "", skill: "observation" }
    ]
  };
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(formdata: NgForm) {
    console.table(this.questions);
  }

}
