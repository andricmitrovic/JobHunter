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
      ime : ['',[]],
      datum: ['', []],
      email: ['',[]],
      lozinka: [''],
      url: ['']
    });
    this.showForm = true;
    this.showLogin = false;
   }

  onRegisterClick(){
    this.student = new Student(this.ime?.value, new Date(this.datum?.value), this.email?.value, this.sifra?.value, "");
    console.log(this.student);
    this.showForm = false;
    this.showLogin = true;
  }
  ngOnInit(): void {
  }
  public get ime(){
    return this.registerForm.get('ime');
  }
  public get prezime(){
    return this.registerForm.get('prezime');
  }
  public get datum(){
    return this.registerForm.get('datum');
  }
  public get email(){
    return this.registerForm.get('email');
  }
  public get sifra(){
    return this.registerForm.get('sifra');
  }
  public get urlImg(){
    return this.registerForm.get('url');
  }
}
