import { Component } from "@angular/core";
import { TutorilaService } from "ui/app/service/tutorial/tutorialservice";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css']
})
export class AppHeader {
    constructor(public courseService:TutorilaService){
        courseService.getAllTopics().pipe().subscribe(observable=>{this.courses=observable;});
    }
    courses; 
}
