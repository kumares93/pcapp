import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class CodeExecutorService {

  constructor(private httpClient:HttpClient) { }
  
  codeResult:any;

    getLanguages(): Observable<any> {
        return this.httpClient.get(" https://api.judge0.com/languages");
    }

    executeCode(data){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.httpClient.post("https://api.judge0.com/submissions",data, httpOptions);
    }

    getStatusOfCodeExecution (token) {
        return this.httpClient.get("https://api.judge0.com/submissions/" + token)
    }

}