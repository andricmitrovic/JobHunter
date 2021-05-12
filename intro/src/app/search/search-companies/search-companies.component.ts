import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public checkoutForm: FormGroup;
  query: any;

  constructor(private formBuilder: FormBuilder) {
    this.inputValue = "";
    this.showCompanies = false;

    this.checkoutForm = this.formBuilder.group({
      searchString: [''],
      adress: ['Beograd'],
      positionSeniority: ['Internship'],
      length: ['lt 3']
      });
    
    this.query = this.checkoutForm.value;

    console.log(this.checkoutForm)

   }

  ngOnInit(): void {
    
  }

  displayCompanies(){
    this.showCompanies = true;
  }

  onChangeInput(event: Event) {
    const newInput: string = (event.target as HTMLInputElement).value;
    this.inputValue = newInput;
  }

  public submitSearchForm(){
    this.query = this.checkoutForm.value;

    console.log("From submit form");
    console.log(this.query);

    this.displayCompanies();
  }
  
}
