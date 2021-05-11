import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Observable<Company[]>;

  constructor(private companyServices: CompanyService) { 
    this.companies = this.companyServices.getCompanies();
    //console.log(this.companies)
  }

  ngOnInit(): void {
  }

}
