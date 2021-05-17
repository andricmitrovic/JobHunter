import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
declare const $: any;

@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css'],
})
export class SearchCompaniesComponent implements OnInit {

  public checkoutForm: FormGroup;
  query: any;

  eventsSubject: Subject<any> = new Subject<any>();

  constructor(private formBuilder: FormBuilder) {

    this.checkoutForm = this.formBuilder.group({
      searchString: [''],
      adress: ['all'],
      positionSeniority: ['all'],
      length: ['all']
      });
    
    this.query = this.checkoutForm.value;
   }

  ngOnInit(): void {
  }

  public submitSearchForm(){
    this.query = this.checkoutForm.value;

    this.eventsSubject.next(this.query);
  }
  
}
