import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-search-students',
  templateUrl: './search-students.component.html',
  styleUrls: ['./search-students.component.css']
})
export class SearchStudentsComponent implements OnInit {

  inputValue : string;
  showSearch : boolean;
  showStudents : boolean;

  constructor() {
    this.inputValue = "";
    this.showSearch = true;
    this.showStudents = false;
   }

  ngOnInit(): void {
    $('.ui.dropdown').dropdown();

    // $('.ui.dropdown').dropdown({
    //   action: 'nothing'
    // });
    // $('.ui.checkbox').checkbox();
    
  }

  onClick(){
    this.showStudents = true;
  }

  onChangeInput(event: Event) {
    const newInput: string = (event.target as HTMLInputElement).value;
    this.inputValue = newInput;
  }

}
