import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import jspdf from 'jspdf';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {


  closeResult = '';

  @Input() student!: Student;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(private sS: StudentService, private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  public SavePDF(): void {
    
    const pdfTable = this.pdfTable.nativeElement;

    const documentDefinition = {content: htmlToPdfmake(pdfTable.innerHTML)};

    pdfMake.createPdf(documentDefinition).download('cv.pdf');
  }

    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.SavePDF();
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
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
