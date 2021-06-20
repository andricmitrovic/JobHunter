import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import htmlToPdfmake from 'html-to-pdfmake';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {


  // Promenljive
  closeResult : string = '';
  showTemplate : boolean;
  dataToExport = {"PersonalInfo":[], "ContactInfo":[], "Education":[]};
  formCV : FormGroup;

  @Input() student!: Student;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  constructor(private sS: StudentService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.showTemplate = true;
    this.formCV = new FormGroup({
      tableview: new FormControl(),
      templateview: new FormControl()
   }); 
  }

  ngOnInit(): void {

  }
  
  public SavePDF(): void {
    

    if (this.dataToExport['viewtype'] === "tableview") {


      
    let doc = new jsPDF('portrait');
    
    doc.setFontSize(16);
    doc.text(`CV ${this.student.personalInfo.fullName}`, 20, 8);
    doc.setFontSize(12);
    doc.setTextColor(156);

    // TODO, dinamicki se pravi niz objekata u zavisnosti od check vrednosti
    autoTable(doc, {
      body: [
        { FullName: this.student.personalInfo.fullName, Gender: this.student.personalInfo.gender, DateOfBirth: String(this.student.personalInfo.dateOfBirth), Address: this.student.personalInfo.adress, About : this.student.about },
      ],
      columns: [
        { header: 'FullName', dataKey: 'FullName' },
        { header: 'Gender', dataKey: 'Gender' },
        { header: 'DateOfBirth', dataKey: 'DateOfBirth' },
        { header: 'Adress', dataKey: 'Adress' },
        { header: 'About', dataKey: 'About' }
      ]})

      autoTable(doc, {
        body: [
          { Email: this.student.email, GitHub: this.student.portfolio.gitHub, LinkedIn: this.student.portfolio.linkedin }
        ],
        columns: [
          { header: 'Email', dataKey: 'Email' },
          { header: 'GitHub', dataKey: 'GitHub' },
          { header: 'LinkedIn', dataKey: 'LinkedIn' }
        ]})
  
        autoTable(doc, {
          body: [
            { University: this.student.education.university, Faculty: this.student.education.faculty, GPA: this.student.education.gpa }
          ],
          columns: [
            { header: 'University', dataKey: 'University' },
            { header: 'Faculty', dataKey: 'Faculty' },
            { header: 'GPA', dataKey: 'GPA' }
          ]})
    
          let body_expirience = [];
          for (let expirience of this.student.experience) {
            var prop = "_id";
            delete expirience[prop]; 
            body_expirience.push(expirience);
          }

          autoTable(doc, {
            body: body_expirience,
            columns: [
              { header: 'Company', dataKey: 'company' },
              { header: 'Position', dataKey: 'position' },
              { header: 'Length', dataKey: 'length' }
            ]})
    
            let body_tehnologies = [];
          for (let tehnology of this.student.technologies) {
            body_tehnologies.push({"tehnologies" : tehnology});
          }

            autoTable(doc, {
              body: body_tehnologies,
              columns: [
                { header: 'Tehnologies', dataKey: 'tehnologies' }
              ]})
      

    doc.output('dataurlnewwindow');

    doc.save(`${this.student.personalInfo.fullName}_CV.pdf`);
    

    }    
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

    public next() : void {


      if (!this.formCV.get('tableview').value) {
        this.showTemplate = true;   
        window.alert("Must choose one template");  
      } else {

        this.dataToExport['viewtype'] =this.formCV.get('tableview').value;
        console.log(this.dataToExport);

        this.showTemplate = false;
      }
    }

    public back() : void {                                                                                                                                                                                                                                                                                                             
      this.showTemplate = true;
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
