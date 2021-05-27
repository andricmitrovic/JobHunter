import { StudentProfileComponent } from './user/student-profile/student-profile.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { SearchStudentsComponent } from './search/search-students/search-students.component';
import { StudentsComponent } from './profile/students/students.component';
import { StudentInfoComponent } from './students/student-info/student-info.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search/search.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {CommonModule} from '@angular/common';
import { UserFormUpdateComponent } from './user/user-form-update/user-form-update.component'


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    CommonModule,
    NgbModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SearchComponent,
    SearchStudentsComponent,
    LoginComponent,
    StudentsComponent,
    StudentInfoComponent,
    StudentListComponent,
    UserProfileComponent,
    StudentProfileComponent,
    UserFormUpdateComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
