import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { query } from '@angular/animations';
import { CompanyComponent } from './company/company.component'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

  // check
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<any>;
  studentObs!: Observable<Student | null>;
  student! : Student | null;

  form!: FormGroup;
  showRegisterCompany: boolean;
  showRegisterStudent: boolean;
  login:boolean;

  sub! : Subscription;

  eventsSubject: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private studentService: StudentService) {

    this.showRegisterCompany = false;
    this.showRegisterStudent = false;
    this.login = true;

  }

  //check
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
  
  onStudentClick(){
    this.showRegisterCompany = false;
    this.showRegisterStudent = true;
    console.log("in on Sompany CLick")

  }
  onCompanyClick(){
    this.showRegisterCompany = true;
    this.showRegisterStudent = false;
    console.log("in onCompany CLick")
  }
}
