import { Subscription } from 'rxjs';
import { StudentService } from './../../students/services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit, OnDestroy{

  @Input() student!: Student | null;
  showLogin : boolean;
  sub! : Subscription;
  formChangePassword! : FormGroup;

  showChangePassword: boolean;
  showSuccess : boolean;
  showUpdateForm : boolean;

  constructor(private studentService:StudentService, private fb:FormBuilder) {
    this.showLogin = false;
    this.showChangePassword = false;
    this.showSuccess = false;
    this.showUpdateForm = false;

    this.formChangePassword = this.fb.group({
      old_password : ['', Validators.required],
      new_password : ['', [Validators.required, Validators.minLength(8)]],
      new_password_r : ['', [Validators.required, Validators.minLength(8)]]
    });

   }

  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

  public Logout(){
    this.showLogin = true;
    this.studentService.logouStudent();
  }

  public changePassword(){
    this.showChangePassword = !this.showChangePassword;
    this.showSuccess = false;
  }

  public submitChangePassword(){
      if (this.new_password != this.new_password_r){
        window.alert("You've enetered different values for new password!");
      }
      else {
        this.sub = this.studentService.changeStudentPassword(this.student.email, this.old_password, this.new_password)
          .subscribe((response) => {this.showSuccess = true; this.formChangePassword.reset();
          });

      }
  }

  public deleteAccount(){
    const email = this.student.email;

    this.studentService.deleteStudentAccount(email).subscribe();
    this.showLogin = true;
    location.replace("#/login");
  }

  public updateProfile(){
    this.showUpdateForm = !this.showUpdateForm;
  }

  public get old_password(){
    return this.formChangePassword.get('old_password').value;
  }

  public get new_password(){
    return this.formChangePassword.get('new_password').value;
  }

  public get new_password_r(){
    return this.formChangePassword.get('new_password_r').value;
  }

}
