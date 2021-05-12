import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  @Input() query!: any;

  companies!: Observable<Company[]>;

  constructor(private companyServices: CompanyService) { 
  }

  ngOnInit(): void {
    //console.log(this.query);

    this.companies = this.companyServices.getCompanies(this.query);  // TODO mora ovde jer se nakon inita query inicijalizuje, ali get mora da se poziva svaki put kad se klikne ne samo jednom
  }

}
