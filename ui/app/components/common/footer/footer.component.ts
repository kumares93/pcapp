import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: [ './footer.component.css' ]
})
export class AppFooter {
    courses: object[] = [{"id": "1", "title": "C"},
    {"id": "2", "title": "C++"},
    {"id": "3", "title": "Java"},
    {"id": "4", "title": "Node"}];
}
