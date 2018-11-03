import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from "./app.component";
import { AppHeader } from './header/header.component';
import { AppFooter } from './footer/footer.component';
import { Topics } from './topics/topics.component';
import { ContentAreaComponent } from './contentarea/contentarea.component';
import { YoutubePlayerComponent } from './youtubeplayer/youtube-player.component';
import { EditorComponent } from './editor/editor.component';
import { TutorilaService } from './service/tutorialservice';
import { CodeExecutorService } from './service/code-executor/code-executor.service';

const appRoutesConfig: Routes = [
  {
      path: '',
      redirectTo: 'course/Java/rVucuobUwko',
      pathMatch: 'full'
  },
  { path: 'course/:courseId', component: ContentAreaComponent,
      children: [
          {  path: ':topicId', component: YoutubePlayerComponent},
      ]
  },
];

@NgModule({
  declarations: [
    AppComponent, AppHeader, AppFooter,
    Topics, ContentAreaComponent, YoutubePlayerComponent, EditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    YoutubePlayerModule,
    AceEditorModule,
    RouterModule.forRoot(appRoutesConfig)
  ],
  providers: [TutorilaService, CodeExecutorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
