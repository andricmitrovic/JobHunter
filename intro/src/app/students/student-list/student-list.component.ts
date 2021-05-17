import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  
  private eventsSubscription!: Subscription;
  @Input() events!: Observable<any>;

  students!: Observable<Student[]>;
  
  constructor(private studentServices: StudentService) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((query) => this.students = this.studentServices.getStudents(query));
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
