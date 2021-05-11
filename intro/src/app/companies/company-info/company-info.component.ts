import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  @Input() company!: Company;

  constructor() { }

  ngOnInit(): void {
    console.log(this.company)
  }

}
