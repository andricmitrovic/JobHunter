import { Component, OnInit, NgModule } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
declare const $: any;

@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css'],
})
export class SearchCompaniesComponent implements OnInit {
  inputValue : string;
  showCompanies : boolean;

  constructor() {
    this.inputValue = "";
    this.showCompanies = false;
   }

  ngOnInit(): void {
    
  }

  onClick(){
    this.showCompanies = true;
  }

  onChangeInput(event: Event) {
    const newInput: string = (event.target as HTMLInputElement).value;
    this.inputValue = newInput;
  }
  
}
