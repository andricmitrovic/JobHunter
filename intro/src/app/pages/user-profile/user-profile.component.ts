import { JwtService } from './../../../services/jwt.service';
import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import {  OnInit, Input, ViewChild, ElementRef, Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import jspdf from 'jspdf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtServiceCompanyService } from './../../../services/jwt-service-company.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() student!: Student | null;
  showLogin : boolean;
  sub! : Subscription;
  formChangePassword! : FormGroup;

  showChangePassword: boolean;
  showSuccess : boolean;
  showUpdateForm : boolean;

  @ViewChild('pdfTable') pdfTable: ElementRef;



  constructor(private studentService:StudentService, private fb:FormBuilder, private jwtService: JwtService) {
    this.showLogin = false;
    this.showChangePassword = false;
    this.showSuccess = false;
    this.showUpdateForm = false;

    this.formChangePassword = this.fb.group({
      old_password : ['', Validators.required],
      new_password : ['', [Validators.required, Validators.minLength(8)]],
      new_password_r : ['', [Validators.required, Validators.minLength(8)]]
    });
    this.student = jwtService.getDataFromToken();


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


  ngOnInit(): void {

  }

  public SavePDF(): void {
    const pdfTable = this.pdfTable.nativeElement;

    const documentDefinition = {content: htmlToPdfmake(pdfTable.innerHTML)};

    pdfMake.createPdf(documentDefinition).download('cv.pdf');
  }
}
