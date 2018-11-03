import { Component } from "@angular/core";
import { Topic } from "../service/topic";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'course-topics',
    templateUrl: './topics.component.html',
    styleUrls: [ ]
})
export class Topics {

    courseName:string;
    constructor(private router: Router ,private activeRoute: ActivatedRoute,) {
        this.activeRoute.params.subscribe(params => {
            this.courseName = params.courseId;
            console.log('Topics', params)
        });
    }
    
    topics:Topic[] = [{
        "id": 1,
        "title": "Test1",
        "description": "Overview about the product",
        "videoURL": "https://www.youtube.com/watch?v=rVucuobUwko",
        "videoType": "mp4",
        "videoID": "rVucuobUwko"
      },{
        "id": 2,
        "title": "Test2",
        "description": "ccx call flow",
        "videoURL": "https://www.youtube.com/watch?v=rVucuobUwko",
        "videoType": "mp4",
        "videoID": "O-nGaQTyJlA"
      }];

      onSelect(top) {
        console.log('[HK] onSelect>', top);
        this.router.navigate(['/course', {courseId: this.courseName, topicId: top.videoID}]);
      }
}
