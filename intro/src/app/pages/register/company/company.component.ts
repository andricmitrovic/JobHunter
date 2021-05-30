import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from './../../../profile/models/companies.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  formRegisterCompany: FormGroup;
  public showLogin : boolean;

  constructor(private fb: FormBuilder) {

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
      //TODO!
      console.log(this.formRegisterCompany.value)
        // this.showLogin = true;
    }

  ngOnInit(): void {
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

}
