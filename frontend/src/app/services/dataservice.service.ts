import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  url = "http://localhost:1111/api/";
  constructor(private http: HttpClient) {

  }
  getQuestions(activtiy: string, classID: string, subjectID: string, chapterID: string) {
    const data = { activity: activtiy, class: classID, subject: subjectID, chapter: chapterID };
    return this.http.post<JSON>(this.url.concat("user/getQuestions"), { data: data });
  }
  saveQuestions(solutions) {
    return this.http.post<JSON>(this.url.concat("user/saveAnswers"), { data: solutions, userID: 1, belongToID: 1 });
  }
  addQuestions(data) {
    return this.http.post<JSON>(this.url.concat("admin/addQuestions"), { data: data });
  }
}
