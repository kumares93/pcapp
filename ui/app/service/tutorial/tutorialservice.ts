import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic, CourseModel } from '../../modals/topic';
import { Topics } from 'ui/app/components/tutorial/topics/topics.component';
import { observable } from 'rxjs';
import { async } from '@angular/core/testing';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
@Injectable()
export class TutorilaService {
    public course:CourseModel[]=DefaultCourse ;
    constructor(private http: HttpClient) {
    this.getAllTopics().pipe().subscribe(observable=>{this.course=observable;});
     
    }
    TopicsObject;
 
    getAllTopics() {
        return  this.http.get<CourseModel[]>("http://localhost:4300/api/courses")
        //.pipe().subscribe(observable=>{this.course=observable;});
    }
 
    getById(compName:string, id: number) {
        return this.http.get<CourseModel>('http://localhost:3000/ccx/' + id);
    }
 
    /* create(product: Topic) {
        console.log('create service -->',product);
        return this.http.post('http://localhost:3000/ccx/', product, httpOptions);
    }
 
    update(product: Topic) {
        return this.http.put('http://localhost:3000/ccx/' + product.id, product);
    }
 
    delete(id: number) {
        return this.http.delete('http://localhost:3000/ccx/' + id);
    } */
}

let DefaultCourse:CourseModel[] =[{ "courseId": 2,
 "name": "Node JS",
 "description": "node js",
 "topics": [
    { 
        "topicId": 1, "name": "introduction", "videoId": "Z1Yd7upQsXY", 
        "videoURL": "https://www.youtube.com/watch?v=1IkcJcu4ksE&list=PLWPirh4EWFpEJHjapNGggf6XVUjHSkY8z",
        "editor": {"id": 1, "code": "console.log('hi')"},
        "projectUrl":"http://www.github.com"
    },
    { 
        "topicId": 2, "name": "basics", "videoId": "TkvQPNdGAKc", 
        "videoURL": "https://www.youtube.com/watch?v=Pa-YPdl1rX8&index=2&list=PLWPirh4EWFpEJHjapNGggf6XVUjHSkY8z",
        "editor": {"id": 1, "code": "console.log('hi')"},
        "projectUrl": "http://www.github.com"
    },
    { 
        "topicId": 3, "name": "advanced nodejs", "videoId": "evU3TzbraQM", 
        "videoURL": "https://www.youtube.com/watch?v=qDUOOKN8O8U&list=PLWPirh4EWFpEJHjapNGggf6XVUjHSkY8z&index=5",
        "editor": {"id": 1, "code": "console.log('hi')"},
        "projectUrl":"http://www.github.com"
    }
]}]