import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import {  OnInit, Input, ViewChild, ElementRef, Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import jspdf from 'jspdf';
import { FormBuilder } from '@angular/forms';
import { JwtServiceCompanyService } from './../../../services/jwt-service-company.service';
import { JwtService } from 'src/services/jwt.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  public student :Student;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(private fb: FormBuilder, private studentService: StudentService, private JwtService: JwtService) {
    // this.student = JwtService.getDataFromToken(); 
    // TODOCHECK
  }


  ngOnInit(): void {
  
  }

  public SavePDF(): void {
    const pdfTable = this.pdfTable.nativeElement;

    const documentDefinition = {content: htmlToPdfmake(pdfTable.innerHTML)};

    pdfMake.createPdf(documentDefinition).download('cv.pdf');
  }
}
