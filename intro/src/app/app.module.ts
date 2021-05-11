import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
// Angular material koristimo za stilizovanje formulara
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from "@angular/common/http"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCompaniesComponent } from './search/search-companies/search-companies.component';
import { StudentComponent } from './register/student/student.component';
import { CompanyComponent } from './register/company/company.component';
import { StudentsComponent } from './profile/students/students.component';
import { CompaniesComponent } from './profile/companies/companies.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentInfoComponent } from './students/student-info/student-info.component';
import { SearchStudentsComponent } from './search/search-students/search-students.component';
import { SearchComponent } from './search/search/search.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyInfoComponent } from './companies/company-info/company-info.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchCompaniesComponent,
    StudentComponent,
    CompanyComponent,
    StudentsComponent,
    CompaniesComponent,
    LoginComponent,
    StudentListComponent,
    StudentInfoComponent,
    SearchStudentsComponent,
    SearchComponent,
    CompanyListComponent,
    CompanyInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
