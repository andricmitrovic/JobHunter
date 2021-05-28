import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  @Input() company!: Company;
  showProfile : boolean;

  constructor() {
    this.showProfile = false;
   }

  ngOnInit(): void {
  }

  public clickName(){
    this.showProfile = !this.showProfile;
  }

}
