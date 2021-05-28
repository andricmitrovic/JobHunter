import { CompaniesComponent } from './../../profile/companies/companies.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from 'src/app/search/search/search.component';
import { SearchCompaniesComponent } from 'src/app/search/search-companies/search-companies.component';
import { SearchStudentsComponent } from 'src/app/search/search-students/search-students.component';
// import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StudentListComponent } from 'src/app/students/student-list/student-list.component';
import { StudentInfoComponent } from 'src/app/students/student-info/student-info.component';
import { CompanyListComponent } from 'src/app/companies/company-list/company-list.component';
import { CompanyInfoComponent } from 'src/app/companies/company-info/company-info.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    SearchComponent,
    SearchCompaniesComponent,
    SearchStudentsComponent,
    StudentListComponent,
    StudentInfoComponent,
    CompanyListComponent,
    CompanyInfoComponent,
    CompaniesComponent   ]
})

export class AdminLayoutModule {}
