import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataserviceService {
  url = "http://localhost:1111/api/";
  constructor(private http: HttpClient) {
  }
  getQuestions(activtiy: string, classID: Number, subjectID: Number, chapterID: Number, userID: Number) {
    const data = { activity: activtiy, class: classID, subject: subjectID, chapter: chapterID, user: userID };
    return this.http.post<JSON>(this.url.concat("user/getQuestions"), { data: data });
  }
  saveQuestions(solutions, userID: Number, classID: Number, subjectID: Number, chapterID: Number, activity: string) {
    return this.http.post<JSON>(this.url.concat("user/saveAnswers"), { data: solutions, userID: userID, classID: classID, subjectID: subjectID, chapterID: chapterID, activity: activity });
  }
  addVideoQuestions(data) {
    return this.http.post(this.url.concat("admin/videoQuestions"), data);
  }
  addRevisionQuestions(data) {
    return this.http.post(this.url.concat("admin/revisionQuestions"), data);
  }
  addGameQuestions(data) {
    return this.http.post(this.url.concat("admin/gameQuestions"), data);
  }
  addTestQuestions(data) {
    return this.http.post(this.url.concat("admin/testQuestions"), data);
  }
  getClasses() {
    return this.http.get(this.url.concat("admin/getClasses"));
  }
  getSubjects(classID) {
    return this.http.get(this.url.concat("admin/getSubjects?classId=" + classID));
  }
  getChapters(classID, subjectID) {
    return this.http.get(this.url.concat("admin/getChapters?classId=" + classID + "&subjectId=" + subjectID));
  }
}
