import { Component } from "@angular/core";
import { Topic, CourseModel } from "../../../modals/topic";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TutorilaService } from "ui/app/service/tutorial/tutorialservice";

@Component({
    selector: 'course-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css']
})
export class Topics {

    courseName:string;
    constructor(private router: Router ,private activeRoute: ActivatedRoute,private courseService:TutorilaService) {
        this.activeRoute.params.subscribe(params => {
            this.courseName = params.courseId || "Node JS";
            console.log('Topics', params);
            this.courseService.TopicsObject=params;
            courseService.getAllTopics().pipe().subscribe(observable=>{this.courses=observable;});
        });
    }
    
 courses:CourseModel[];
//  =[{ 
//     "courseId": 1,
//     "name": "JavaScript", 
//     "description": "javascript",
//     "topics": [
//         {
//             "topicId": 1, "name": "Introduction to JS", "videoId": "N0lxfilGfak", "videoURL": "https://www.youtube.com/watch?v=W6NZfCO5SIk",
//             "editor": {"id": 1, "code": "console.log('hi')"},
//             "projectUrl":"http://www.github.com"
//         },
//         { 
//             "topicId": 2, "name": "basic javascript", "videoId": "Z1Yd7upQsXY", "videoURL": "https://www.youtube.com/watch?v=zGWwutqP3u0",
//             "editor": {"id": 1, "code": "console.log('hi')"},
//             "projectUrl": "http://www.github.com"
//         }
//     ]
// },

// { "courseId": 2, "name": "Node JS", "description": "node js",
//     "topics": [
//         { 
//             "topicId": 1, "name": "introduction", "videoId": "Z1Yd7upQsXY", "videoURL": "https://www.youtube.com/watch?v=1IkcJcu4ksE&list=PLWPirh4EWFpEJHjapNGggf6XVUjHSkY8z",
//             "editor": {"id": 1, "code": "console.log('hi')"},
//             "projectUrl":"http://www.github.com"
//         },
//         { 
//             "topicId": 2, "name": "basics", "videoId": "TkvQPNdGAKc", "videoURL": "https://www.youtube.com/watch?v=Pa-YPdl1rX8&index=2&list=PLWPirh4EWFpEJHjapNGggf6XVUjHSkY8z",
//             "editor": {"id": 1, "code": "console.log('hi')"},
//             "projectUrl": "http://www.github.com"
//         },
//         { 
//             "topicId": 3, "name": "advanced nodejs", "videoId": "evU3TzbraQM", 
//             "videoURL": "https://www.youtube.com/watch?v=qDUOOKN8O8U&list=PLWPirh4EWFpEJHjapNGggf6XVUjHSkY8z&index=5",
//             "editor": {"id": 1, "code": "console.log('hi')"},
//             "projectUrl":"http://www.github.com"
//         }
//     ]
// }]
      onSelect(top) {
        console.log('[HK] onSelect>', top);
        this.router.navigate(['/course', {courseId: this.courseName, topicId: top.videoID}]);
      }
}
