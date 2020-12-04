import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VideoComponent } from './user/video/video.component';
import { RevisionComponent } from './user/revision/revision.component';
import { RevisionQuestionComponent } from './admin/revision-question/revision-question.component';
import { GameQuestionComponent } from './admin/game-question/game-question.component';
import { TestpaperQuestionComponent } from './admin/testpaper-question/testpaper-question.component';
import { VideoQuestionComponent } from './admin/video-question/video-question.component';
import { TestComponent } from './user/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    PagenotfoundComponent,
    VideoComponent,
    RevisionComponent,
    RevisionQuestionComponent,
    GameQuestionComponent,
    TestpaperQuestionComponent,
    VideoQuestionComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
