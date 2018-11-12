import { Component,Inject } from "@angular/core";
import { TutorilaService } from "ui/app/service/tutorial/tutorialservice";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserSignupService , User } from '../../../service/user/UserSignupService';
import { Login } from "../login/login.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css']
})
export class AppHeader {
    constructor(public courseService:TutorilaService, private UserSignupService:UserSignupService,public dialog: MatDialog){
        courseService.getAllTopics().pipe().subscribe(observable=>{this.courses=observable;});
    }
    courses; 
    openLoginDialog(){
      this.dialog.open(Login);
    }
    openDialog() {
        this.dialog.open(SignUp);
      }
      logOut(){
        this.dialog.open(Logout);
    }
     
    }


@Component({
    selector: 'sign-up',
    templateUrl: './signUp.component.html',
    styleUrls: [ './signUp.component.css']
})
export class SignUp {

    constructor( private UserSignupService:UserSignupService, public dialogRef: MatDialogRef<SignUp>){
        
    }
    onNoClick() {
        this.dialogRef.close();
      }
    userDetails:object; 
    onSubmit(user) {
      this.userDetails = {username:user.target[0].value,
                        password:user.target[1].value,
                        email:user.target[2].value,
                        mobile:user.target[3].value}
       this.UserSignupService.saveUserSignupDetails(this.userDetails).subscribe((obser)=>{console.log(obser)});
      }
      
}
@Component({
    selector: 'logout',
    templateUrl: './logout/logout.component.html',
    styleUrls: [ './logout/logout.component.css']
})
export class Logout {

    constructor( private UserSignupService:UserSignupService, public dialogRef: MatDialogRef<SignUp>){
        
    }
    onNoClick(): void {
        this.dialogRef.close();
      }
    logOut(){
        {
      this.UserSignupService.LoginStatus=!this.UserSignupService.LoginStatus;
      this.UserSignupService.LoginData={created:"",email:"",mobile:"",password:"",username:""}
      this.dialogRef.close();
    }
  }
      
}


// import {Component, Inject} from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

// /**
//  * @title Dialog Overview
//  */
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: [ './header.component.css']
// })
// export class AppHeader {

//   animal: string;
//   name: string;

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(SignUp, {
//       width: '500px',
//       data: {name: this.name, animal: this.animal}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }

// }

// @Component({
//   selector: 'sign-up',
//   templateUrl: './signUp.component.html',
// })
// export class SignUp {

//   constructor(
//     public dialogRef: MatDialogRef<SignUp>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }