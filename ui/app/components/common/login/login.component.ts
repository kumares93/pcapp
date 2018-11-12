import { Component , Inject } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormField} from '@angular/material';
import { UserSignupService, User } from "ui/app/service/user/UserSignupService";
export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css']
})
export class Login {

  constructor(
    public dialogRef: MatDialogRef<Login>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public UserSignupService:UserSignupService) {}
    userDetails:login;
    Message:string; 
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(user) {
    this.userDetails = {email:user.target[0].value,
                      password:user.target[1].value,
                      }
     this.UserSignupService.userLogin(this.userDetails).subscribe((obser:User)=>{console.log(obser);
      if(obser.email==this.userDetails.email){
      this.UserSignupService.LoginStatus=true;
      this.UserSignupService.LoginData=obser;
      this.dialogRef.close();  
    }else 
    this.Message="Username or password Mismatch";
      
    });

    }

}
export interface login{
  email:string;
  password:string;
}