import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../models/student';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
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
    console.log("On name clicked ");
    console.log(this.showProfile);
    this.showProfile = !this.showProfile;

  }

}
