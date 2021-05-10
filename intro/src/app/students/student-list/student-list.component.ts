import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  students: Observable<Student[]>;
  
  constructor(private studentServices: StudentService) {
    this.students = this.studentServices.getStudents();
    console.log(this.students)
  }


  ngOnInit(): void {
  }

}
