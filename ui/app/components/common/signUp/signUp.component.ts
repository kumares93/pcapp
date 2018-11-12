import { Component } from "@angular/core";
import { UserSignupService } from 'ui/app/service/user/UserSignupService';

@Component({
    selector: 'sign-up',
    templateUrl: './signUp.component.html',
    styleUrls: [ './signUp.component.css']
})
export class SignUp {

    constructor(private UserSignupService:UserSignupService){
        
    }

    userDetails:object;
    username: string;
    email: string;
    password: string;
    mobile: number;
 
  
    onSubmit(user) {
      this.userDetails = {username:user.target[0].value,
                        password:user.target[1].value,
                        email:user.target[2].value,
                        mobile:user.target[3].value}
       this.UserSignupService.saveUserSignupDetails(this.userDetails).subscribe((obser)=>{console.log(obser)});
      }
      
}
