import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Student } from './../../profile/models/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student!:Student;
  registerForm: FormGroup;
  showForm : boolean;
  showLogin: boolean;
  constructor(private fb: FormBuilder) {
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
    this.student = new Student(this.name?.value, new Date(this.date?.value), this.email?.value, this.password?.value, "");
    console.log(this.student);
    this.showForm = false;
    this.showLogin = true;
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
