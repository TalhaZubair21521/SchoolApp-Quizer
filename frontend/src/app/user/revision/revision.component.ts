import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {
  quesiton: any;
  currentQuestion: any;
  constructor(private dataService: DataserviceService) {
    this.dataService.getQuestions("revision", "1", "1", "1").subscribe(
      (data) => {
        this.quesiton = data["data"]["questions"];
        this.currentQuestion = this.quesiton[0];
        console.table(this.quesiton)
      },
      err => { console.log(err) }
    )
  }

  ngOnInit(): void {
  }

}
