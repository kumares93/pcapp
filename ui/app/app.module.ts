import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {MatDialogModule,MAT_DIALOG_DEFAULT_OPTIONS,MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule} from '@angular/material';
import {NoopAnimationsModule,BrowserAnimationsModule} from '@angular/platform-browser/animations';

//import { Login } from "./components/common/login/login.component";
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from "./app.component";
import { AppHeader, Logout } from './components/common/header/header.component';
import { SignUp } from './components/common/header/header.component';
import { Login } from "./components/common/login/login.component";
import { AppFooter } from './components/common/footer/footer.component';
import { Topics } from './components/tutorial/topics/topics.component';
import { HomeComponent } from './components/home/home.component';
import { YoutubePlayerComponent } from './components/common/youtubeplayer/youtube-player.component';
import { EditorComponent } from './components/common/editor/editor.component';
import { TutorilaService } from './service/tutorial/tutorialservice';
import { CodeExecutorService } from './service/code-executor/code-executor.service';
import { UserSignupService } from './service/user/UserSignupService';


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
    Topics, HomeComponent, YoutubePlayerComponent, EditorComponent, SignUp,Login,Logout 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    YoutubePlayerModule,
    AceEditorModule,
    HttpModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutesConfig)
  ],
  entryComponents: [
    SignUp,Login,Logout
],
  providers: [TutorilaService, CodeExecutorService,UserSignupService,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){

  }
  
}
