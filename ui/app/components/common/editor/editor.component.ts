import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { CodeExecutorService } from '../../../service/code-executor/code-executor.service';
import * as ace from 'brace';
import 'brace';
import 'brace/theme/monokai';
import 'brace/mode/typescript';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';
import { TutorilaService } from "ui/app/service/tutorial/tutorialservice";
import { ActivatedRoute, Params, Router, NavigationEnd, UrlSegment } from '@angular/router';
import { CTopic, CourseModel } from "../../../modals/topic";
@Component({
  selector: 'app-online-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    
    @Input()
    courses: CourseModel[];
    topic: any;
    videoid:string;
    @ViewChild('editor') editor;
    text:string = "";
    input:string = "";
    options:any = {maxLines: 1000, printMargin: false};
    languageList:object = [];
    selectedLang:any = "";
    codeResult: string = "";
    
  constructor(private route: ActivatedRoute, private router: Router,private codeExecutorService:CodeExecutorService,private courseService:TutorilaService){
    this.courseService.getAllTopics().pipe().subscribe(observable=>{this.courses=observable;
          this.route.url.subscribe((observer:UrlSegment[])=>{
            this.route.children[0].params.subscribe((observer)=> {console.log(observer);
                this.topic = observer.topicId;
                this.getVideoId(Number(observer.topicId))
        });
              
            });
        });
    // this.route.children[0].params.subscribe((params: Params) => {
    //     this.topic = params.value.topicId;
    //     console.log("paramas:"+this.topic);
    // });
    //console.log(this.route);
    
    // router.events.forEach((event) => {
    //     if(event instanceof NavigationEnd) {
    //       this.route.queryParams.subscribe((queryparams: Params) => { const vid = queryparams['editor'];  } );
    //       this.route.params.subscribe((params: Params) => this.topic = params['topics']);
    //       this.text = this.route.snapshot.queryParams['editor']; 
    //     }
    //   });  
}

getVideoId=(id)=>{
    this.courses.forEach(element => {
      if(this.courseService.TopicsObject.courseId==element.name){
      element.topics.map((value:CTopic)=> {
        if(value.topicId==id){
            this.text=value.editor.code;
            console.log(value.editor.code);
            
        }
      })}
    });
       }
  ngOnInit(){
      this.codeExecutorService.getLanguages()
      .subscribe(result => {
          console.log("EditorComponent on init>>", result);
          this.languageList = result;
      });
  }

  ngAfterViewInit() {
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getEditor().setOptions({
        enableBasicAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
        name: "showOtherCompletions",
        bindKey: "Ctrl-.",
        exec: function (editor) {

        }
    })
}

  selectedLanguage (filterVal: any) {
      console.log('[HK] selected language>>', filterVal);
    this.selectedLang =  filterVal;
  }
  onChange(code) {
    console.log("new code", code);
    }

  executeCode(text){
       let data = {
          "language_id":this.selectedLang,
          "source_code":text,
          "stdin":this.input
      }
      console.log("co--->", data);
      this.codeExecutorService.executeCode(data)
      .subscribe((result:any) => {
        setTimeout(() => {
            console.log("code submmit Response ....", result.token );
            this.codeExecutorService.getStatusOfCodeExecution(result.token)
            .subscribe((result:any) => {
                console.log("code run status>", result);
                this.codeResult = result.stdout;
            });
        }, 5000);
    });
  }
}