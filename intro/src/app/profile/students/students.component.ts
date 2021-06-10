import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {


  closeResult = '';

  @Input() student!: Student;
  @ViewChild('pdfTable') pdfTable: ElementRef;




  head = [['ID', 'NAME', 'DESIGNATION', 'DEPARTMENT']]

  data = [
    [1, 'ROBERT', 'SOFTWARE DEVELOPER', 'ENGINEERING'],
    [2, 'CRISTINAO','QA', 'TESTING'],
    [3, 'KROOS','MANAGER', 'MANAGEMENT'],
    [4, 'XYZ','DEVELOPER', 'DEVLOPEMENT'],
    [5, 'ABC','CONSULTANT', 'HR'],
    [73, 'QWE','VICE PRESIDENT', 'MANAGEMENT'],
  ]

  constructor(private sS: StudentService, private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }
  
  public SavePDF(): void {
    
    let doc = new jsPDF();
    let templateType = 'templatedCV';

    doc.setFontSize(18);
    doc.text(`CV ${this.student.personalInfo.fullName}`, 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(156);


    //  TODO popuniti tabelu podacima iz 
    autoTable(doc, {
      // columnStyles: { europe: { halign: 'center' } }, 
      body: [
        { PersonalInfo: 'Kristina', WorkExpirience: 'Google 9m', ContactInfo: 'kpetrovic134@gmail.com' },
        { PersonalInfo: 'Marija', WorkExpirience: 'Canada', ContactInfo: 'mi15110@gmail.com' },
      ],
      columns: [
        { header: 'PersonalInfo', dataKey: 'PersonalInfo' },
        { header: 'WorkExpirience', dataKey: 'WorkExpirience' },
        { header: 'ContactInfo', dataKey: 'ContactInfo' },
      ]})

    doc.output('dataurlnewwindow')
    doc.save(`${this.student.personalInfo.fullName}_CV.pdf`);
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
