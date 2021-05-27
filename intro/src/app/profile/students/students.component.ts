import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import jspdf from 'jspdf';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @Input() student!: Student;

  constructor(private sS: StudentService) {
  }

  ngOnInit(): void {

  }
  @ViewChild('pdfTable') pdfTable: ElementRef;

  public SavePDF():void{
    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = {  };
    var docDefinition = {
      pageSize: 'A5',
      content: html,
      pageMargins: [ 40, 60, 40, 60 ]
    };
    pdfMake.createPdf(documentDefinition).download("cv.pdf");
  }

}



/*import { Component, OnInit, Input } from '@angular/core';

export class StudentInfoComponent implements OnInit {

  @Input() student!: Student;
  showProfile : boolean;
  constructor() {
    this.showProfile = false;
  }

  ngOnInit(): void {
    console.log(this.student)
  }
  onNameClick(){

    this.showProfile = !this.showProfile;

  }

}
*/
