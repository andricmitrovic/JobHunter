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
  showSearch : boolean;
  showRegister :boolean;
  showLogin : boolean;
  showStudents : boolean;

  constructor() {
    this.inputValue = "";
    this.showSearch = true;
    this.showRegister = false;
    this.showLogin = false;
    this.showStudents = false;
   }

  ngOnInit(): void {
    
  }

  onClick(){
    this.showStudents = true;
  }

  onChangeInput(event: Event) {
    const newInput: string = (event.target as HTMLInputElement).value;
    this.inputValue = newInput;
  }
  onRegisterClick(){
      this.showSearch = false;
      this.showRegister = true;
  }
  onLoginClick(){
    this.showSearch = false;
    this.showLogin = true;
  }

  
}
