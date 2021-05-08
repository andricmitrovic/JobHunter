import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form!: FormGroup;
  showRegisterCompany: boolean;
  showRegisterStudent: boolean;
  showLogInForm: boolean;
  constructor(private fb: FormBuilder) {
    this.showLogInForm = true;
    this.showRegisterCompany = false;
    this.showRegisterStudent = false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password :['', [Validators.required, Validators.minLength(8)]]
  });

  }
  public get email(){
    return this.form.get('email');
  }

  public get password(){
    return this.form.get('password');
  }
  onSubmit(){
    console.log(this.form);
    // komunikacija sa serverom
  }
  onStudentClick(){
    this.showLogInForm = false;
    this.showRegisterCompany = false;
    this.showRegisterStudent = true;

  }
  onCompanyClick(){
    this.showLogInForm = false;
    this.showRegisterCompany = true;
    this.showRegisterStudent = false;
    console.log("in onCompany CLick")
  }
}
