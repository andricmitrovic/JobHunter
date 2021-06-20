import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { MatTabsModule } from '@angular/material/tabs';


import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {CommonModule} from '@angular/common';
import { UserFormUpdateComponent } from './user/user-form-update/user-form-update.component';
import { CompanyProfileComponent } from './user/company-profile/company-profile.component';
import { CompanyFormUpdateComponent } from './user/company-form-update/company-form-update.component'
import { InterestingFactsComponent } from './interesting-facts/interesting-facts.component';

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
    CompanyProfileComponent,
    CompanyFormUpdateComponent,
    InterestingFactsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
