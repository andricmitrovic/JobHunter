import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { CompanyComponent } from '../../pages/register/company/company.component'
import { StudentComponent} from '../../pages/register/student/student.component'
import { SearchStudentsComponent } from 'src/app/search/search-students/search-students.component';
import { SearchCompaniesComponent } from 'src/app/search/search-companies/search-companies.component';
import { SearchComponent } from 'src/app/search/search/search.component';
import { StudentsComponent } from 'src/app/profile/students/students.component';
import { UserFormUpdateComponent } from 'src/app/user/user-form-update/user-form-update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    CompanyComponent,
    StudentComponent
  ]
})
export class AuthLayoutModule { }
