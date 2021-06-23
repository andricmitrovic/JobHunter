import { CompanyService } from './../../companies/services/company.service';
import { Company } from './../register/company/models/company';
import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  private eventsSubscription!: Subscription;
  @Input() events!: Observable<any>;
  studentObs!: Observable<Student | null>;
  student?: Student;
  company?: Company;

  form!: FormGroup;
  showLoginCompany: boolean;
  showLoginStudent: boolean;
  showLogInForm: boolean;
  login: boolean;

  sub!: Subscription;

  eventsSubject: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private studentService: StudentService, private companyService: CompanyService) {

    this.showLogInForm = true;
    this.showLoginCompany = false;
    this.showLoginStudent = false;
    this.login = true;
  }

    ngOnInit(): void {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password : ['', [Validators.required]]

      });

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const tmp = this.form.value;

    if (this.showLoginStudent)
      this.sub = this.studentService.Login(tmp.email, tmp.password).subscribe((student: Student | null) => {
        this.student = student;
        location.replace("#/user-profile");
      });
    else
      this.sub = this.companyService.Login(tmp.email, tmp.password).subscribe((company: Company | null) => {
        this.company = company;
        location.replace('#/company-profile');
      });


  }

  onStudentClick() {
    this.showLogInForm = false;
    this.showLoginCompany = false;
    this.showLoginStudent = true;
  }

  onCompanyClick() {
    this.showLogInForm = false;
    this.showLoginCompany = true;
    this.showLoginStudent = false;
  }
}
