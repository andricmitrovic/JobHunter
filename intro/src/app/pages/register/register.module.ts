import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company/company.component';
import { StudentComponent } from './student/student.component';



@NgModule({
  declarations: [CompanyComponent, StudentComponent],
  imports: [
    CompanyComponent, StudentComponent,
    CommonModule
  ], 
  exports : [StudentComponent, CommonModule]
})
export class RegisterModule { }
