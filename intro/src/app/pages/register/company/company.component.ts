import { CompanyService } from './../../../companies/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from './models/company';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

  company!: Company;
  formRegisterCompany: FormGroup;
  showLogin : boolean;
  showForm : boolean;
  sub : Subscription;



  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.showForm = true;
    this.showLogin = false;
    this.formRegisterCompany = this.fb.group({
      name : ['',[Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(10)]],
      bio: ['']
    });

   }

   onSubmit(){

      this.company = new Company(
        this.email.value,
        {fullName : this.name.value, web: this.web?.value, password: this.password.value},
        [{positionName:"", positionExp:"", length: "", technologies:[""], languages:[""]}],
        this.about?.value

      );

      this.sub = this.companyService.RegisterCompany(this.company).subscribe((company: Company | null) =>{
        this.showForm = false;
        this.showLogin = true;
        this.company  = company;
      });
    }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }

  public get email(){
    return this.formRegisterCompany.get('email');
  }
  public get name(){
    return this.formRegisterCompany.get('name');
  }
  public get password(){
    return this.formRegisterCompany.get('password');
  }
  public get web(){
    return this.formRegisterCompany.get('adress');
  }
  public get about(){
    return this.formRegisterCompany.get('bio');
  }

}


