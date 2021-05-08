import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
// Angular material koristimo za stilizovanje formulara
import {MatFormFieldModule} from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { StudentComponent } from './register/student/student.component';
import { CompanyComponent } from './register/company/company.component';
import { StudentsComponent } from './profile/students/students.component';
import { CompaniesComponent } from './profile/companies/companies.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StudentComponent,
    CompanyComponent,
    StudentsComponent,
    CompaniesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
