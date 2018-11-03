import { Component, OnInit,ViewChild } from '@angular/core';
import { CodeExecutorService } from '../service/code-executor/code-executor.service';
import * as ace from 'brace';
import 'brace/index';
import 'brace/theme/monokai';
import 'brace/mode/typescript';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';

@Component({
  selector: 'app-online-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    
    @ViewChild('editor') editor;

    text:string = "";
    options:any = {maxLines: 1000, printMargin: false};

    languageList:object = [];
    selectedLang:any = "";
    codeResult: string = "";

  constructor(private codeExecutorService:CodeExecutorService){

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
    this.editor.getSession().setMode('ace/mode/javascript');
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
          "source_code":text
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