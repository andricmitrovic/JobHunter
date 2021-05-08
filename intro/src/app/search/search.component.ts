import { Component, OnInit, NgModule } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  inputValue : string;
  showSearch : boolean;
  showRegister :boolean;
  showLogin : boolean;

  constructor() {
    this.inputValue = "";
    this.showSearch = true;
    this.showRegister = false;
    this.showLogin = false;
   }

  ngOnInit(): void {
  }

  onClick(){
    console.log(this.inputValue);
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
