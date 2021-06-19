import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [ StudentsComponent],
  imports: [
    CommonModule
  ], exports: [ StudentsComponent]
})
export class StudentsModule { }
