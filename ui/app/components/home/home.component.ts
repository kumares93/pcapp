import { Component } from "@angular/core";
import { TutorilaService } from "ui/app/service/tutorial/tutorialservice";
import { observable } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [ ]
})
export class HomeComponent {
     courses;
    constructor(public courseService:TutorilaService){
        this.courseService.getAllTopics().pipe().subscribe(observable=>{courseService.course=observable;});
    }
    ngOnInit() {
        
        setTimeout(() => {
            console.log(this.courseService.course);
        }, 0);
    }
}
