import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from "./app.component";
import { AppHeader } from './components/common/header/header.component';
import { AppFooter } from './components/common/footer/footer.component';
import { Topics } from './components/tutorial/topics/topics.component';
import { HomeComponent } from './components/home/home.component';
import { YoutubePlayerComponent } from './components/common/youtubeplayer/youtube-player.component';
import { EditorComponent } from './components/common/editor/editor.component';
import { TutorilaService } from './service/tutorial/tutorialservice';
import { CodeExecutorService } from './service/code-executor/code-executor.service';

const appRoutesConfig: Routes = [
  {
      path: '',
      redirectTo: 'course/Node%20JS/1',
      pathMatch: 'full'
  },
  { path: 'course/:courseId', component: HomeComponent,
      children: [ {
        path: '',
        redirectTo: '1',
        pathMatch: 'full'
    },
    {  path: ':topicId', component: YoutubePlayerComponent},
      ]
  },
];

@NgModule({
  declarations: [
    AppComponent, AppHeader, AppFooter,
    Topics, HomeComponent, YoutubePlayerComponent, EditorComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    YoutubePlayerModule,
    AceEditorModule,
    HttpModule,
    RouterModule.forRoot(appRoutesConfig)
  ],
  providers: [TutorilaService, CodeExecutorService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private courseService:TutorilaService){

  }
  
}
