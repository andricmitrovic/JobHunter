import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './student-profile.component';
import { StudentsComponent } from 'src/app/profile/students/students.component';
import { StudentComponent } from 'src/app/pages/register/student/student.component';


@NgModule({
  declarations: [StudentProfileComponent, StudentComponent],
  imports: [
    CommonModule
  ], exports: [
    StudentProfileComponent, StudentComponent
  ]
})
export class StudentProfileModule { }
