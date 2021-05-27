import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Student } from './../../../students/models/student';
import { StudentService } from '../../../students/services/student.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  student!:Student;
  registerForm: FormGroup;

  sub : Subscription;

  showForm : boolean;
  showLogin: boolean;

  constructor(private fb: FormBuilder, private authService: StudentService) {
    this.registerForm = this.fb.group({
      name : ['',[Validators.required]],
      date: [''],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      url: ['']
    });
    this.showForm = true;
    this.showLogin = false;
   }

  onRegisterClick(){

    // const email: string = this.email?.value;
    // const personalInfo = {
    //   fullName: this.name?.value,
    //   dateOfBirth: new Date(this.date?.value),
    //   password: this.password?.value
    // }

    this.student = new Student(
      this.email?.value,
      {
      fullName: this.name?.value,
      dateOfBirth: new Date(this.date?.value),
      password: this.password?.value
    });

    console.log(this.student);

    this.sub = this.authService.postStudent(this.student).subscribe((student : Student | null) =>{
        if (student){
          this.showForm = false;
          this.showLogin = true;
          this.student = student;
        }
    });
  }
  ngOnInit(): void {
  }

  public get name(){
    return this.registerForm.get('name');
  }

  public get date(){
    return this.registerForm.get('date');
  }
  public get email(){
    return this.registerForm.get('email');
  }
  public get password(){
    return this.registerForm.get('password');
  }
  public get urlImg(){
    return this.registerForm.get('url');
  }
}
