import { Router } from '@angular/router';
import { StudentService } from './../students/services/student.service';
import { Student } from './../students/models/student';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, OnDestroy {

  private eventsSubscription!: Subscription;
  @Input() events!: Observable<any>;
  studentObs!: Observable<Student | null>;
  student! : Student | null;

  form!: FormGroup;
  showRegisterCompany: boolean;
  showRegisterStudent: boolean;
  showLogInForm: boolean;
  login:boolean;

  sub! : Subscription;
  eventsSubject: Subject<any> = new Subject<any>();

  showError: boolean;
  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {

    this.showLogInForm = true;
    this.showRegisterCompany = false;
    this.showRegisterStudent = false;
    this.login = true;
    this.showError = false;
  }

    ngOnInit(): void {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password :['', [Validators.required]]

      });

  }

  ngOnDestroy() {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

  public get email(){
    return this.form.get('email');
  }

  public get password(){
    return this.form.get('password');
  }
  onSubmit(){
    
    
    this.router.navigate(['#/user-profile']);
    const tmp = this.form.value;

    this.sub = this.studentService.Login(tmp.email, tmp.password).subscribe((student:Student | null)=>{
      this.student = student;
    });

    this.router.navigate(['/user-profile']);
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
  }
}
