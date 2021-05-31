import { Company } from './../../pages/register/company/models/company';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  private eventsSubscription!: Subscription;
  @Input() events!: Observable<any>;

  companies!: Observable<Company[]>;

  constructor(private companyServices: CompanyService) {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((query) => this.companies = this.companyServices.getCompanies(query));
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
