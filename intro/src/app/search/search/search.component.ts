import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchStudentsOrCompanies: boolean = true; // true students, false companies

  constructor() { }

  ngOnInit(): void {
  }

  openSearchCompanies(): void
  {
    this.searchStudentsOrCompanies = false;
  }

  openSearchStudents(): void
  {
    this.searchStudentsOrCompanies = true;
  }

}
