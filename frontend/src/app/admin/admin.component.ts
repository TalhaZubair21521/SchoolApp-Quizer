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
      { activity: "video", type: "mcqs", question: "a", option1: "dyuy", option2: "i3u333", option3: "3wtwf", option4: "wef24", answer: "3wtwf", skill: "Reading" },
      { activity: "video", type: "mcqs", question: "c", option1: "er", option2: "reiri", option3: "45yhh", option4: "dfjbvkr", answer: "45yhh", skill: "Observation" },
      { activity: "video", type: "mcqs", question: "asds", option1: "gfhrtu", option2: "dgjir", option3: "dvb", option4: "fj4biu", answer: "gfhrtu", skill: "Listening" },
      { activity: "video", type: "mcqs", question: "4r43", option1: "jfkf", option2: "sjsj", option3: "u4848jf", option4: "rivboi5", answer: "rivboi5", skill: "Writing" },
      { activity: "video", type: "mcqs", question: "fgb", option1: "rrir", option2: "cmcfuirui", option3: "vjrur4iu", option4: "vjberiug", answer: "vjrur4iu", skill: "Learning" },

      { activity: "revision", type: "mcqs", question: "dhd74ue", option1: "ktrhgoei", option2: "vi5hog", option3: "dsjfiew", option4: "iehrfw", answer: "dhd74ue", skill: "Reading" },
      { activity: "revision", type: "mcqs", question: "cjbfiuwu", option1: "bveruiof", option2: "viehoge", option3: "erknnos", option4: "veig9e", answer: "erknnos", skill: "Observation" },
      { activity: "revision", type: "mcqs", question: "i5gh5", option1: "iibb5hg", option2: "iveroifg", option3: "btrihog", option4: "4iugf", answer: "btrihog", skill: "Listening" },
      { activity: "revision", type: "mcqs", question: "iuero", option1: "vjerbiogu5", option2: "ivberog", option3: "gith6oh", option4: "ig5u49gh8", answer: "ivberog", skill: "Writing" },
      { activity: "revision", type: "mcqs", question: "fgkber", option1: "vierog", option2: "vkernog", option3: "kirehog", option4: "ir5hg6", answer: "ir5hg6", skill: "Learning" },

      { activity: "game", type: "mcqs", question: "rtui5i858i8", option1: "jfifirti", option2: "jkgotjkrtk", option3: "vfmrjrj", option4: "dfidfjdfi", answer: "jfifirti", skill: "Reading" },
      { activity: "game", type: "mcqs", question: "btrjhgiot", option1: "ktootififj", option2: "ri8rirfir", option3: "xckkxkd", option4: "drjkdidri", answer: "drjkdidri", skill: "Observation" },
      { activity: "game", type: "mcqs", question: "jrto4586", option1: "939393939", option2: "gfireeo", option3: "sfjsduisdui", option4: "drkrsisi", answer: "gfireeo", skill: "Listening" },
      { activity: "game", type: "mcqs", question: "4949494", option1: "nvfjfgiufiir", option2: "dfjrirsi", option3: "dfjdukfdk", option4: "sksduer", answer: "dfjdukfdk", skill: "Writing" },
      { activity: "game", type: "mcqs", question: "nmgkgkdhdh", option1: "fitoto", option2: "dfjrsuirui", option3: "vfjfudfu", option4: "e9393", answer: "e9393", skill: "Learning" },

      { activity: "test", type: "true/false", question: "e2r34r34r4", option1: "true", option2: "false", option3: "noOption", option4: "noOption", answer: "false", skill: "Memory" },
      { activity: "test", type: "true/false", question: "rfjuirevfbo4 3f84u", option1: "true", option2: "false", option3: "noOption", option4: "noOption", answer: "false", skill: "Conceptual" },
      { activity: "test", type: "true/false", question: "f34 ifuerf iu g4fi4u", option1: "true", option2: "false", option3: "noOption", option4: "noOption", answer: "true", skill: "Application" },
      { activity: "test", type: "oneword", question: "4rjg9iu45 4iu3 hi4", option1: "noOption", option2: "noOption", option3: "noOption", option4: "noOption", answer: "Alrewdad", skill: "Analysis" },
      { activity: "test", type: "oneword", question: "i43oi34ht 4", option1: "noOption", option2: "noOption", option3: "noOption", option4: "noOption", answer: "Crop", skill: "Observation" }
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
        data.append('data', JSON.stringify(this.questions));
        this.dataService.addQuestions(data).subscribe(
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
