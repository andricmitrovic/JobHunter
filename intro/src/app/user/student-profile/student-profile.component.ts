import { StudentService } from './../../students/services/student.service';
import { JwtService } from './../../../services/jwt.service';
import { Student } from './../../students/models/student';
import { Component, OnInit, Input} from '@angular/core';


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  @Input() student!: Student | null;
  showLogin : boolean;
  constructor(private studentService:StudentService) {
    this.showLogin = false;
   }

  ngOnInit(): void {
  }

  public Logout(){
    this.showLogin = true;
    this.studentService.logouStudent();
  }

}
