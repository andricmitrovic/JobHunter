import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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

  facultyDropdownForm! : FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  faculty: Array<{item_id: Number, item_text:String, image: String}>;
  technologies : Array<{item_id: Number, item_text:String, image: String}>;

  selectedItems: Array<{item_id: Number, item_text:String, image: String}>;
  selectedTechnologies: Array<{item_id: Number, item_text:String, image: String}>;

  dropdownSettings: any;


  constructor(private fb:FormBuilder) {
    this.inputValue = "";
    this.showSearch = true;
    this.showStudents = false;
    this.faculty= [];
    this.dropdownSettings = {};
    this.selectedItems = [];
    this.technologies = [];
    this.selectedTechnologies = [];
   }

  ngOnInit(): void {

    this.faculty = [
      {
        item_id: 1,
        item_text: "Matematicki fakultet",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg",
      },
      {
        item_id: 2,
        item_text: "Ekonomski fakultet",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/Spain.jpg",
      },
      {
        item_id: 3,
        item_text: "Elektrotehnicki fakultet",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg",
      },
      {
        item_id: 4,
        item_text: "Fakultet organizacionih nauka",
        image:
          "http://www.sciencekids.co.nz/images/pictures/flags96/Canada.jpg",
      }
    ];

    this.selectedItems = [
      {
        item_id: 2,
        item_text: "Ekonomski",
        image: "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg",
      },
    ];

    this.technologies = [{
      item_id : 1,
      item_text : "Python",
      image : "http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg"
    }]
    this.dropdownSettings = {
      "singleSelection": false,
      "defaultOpen": false,
      "idField": "item_id",
      "textField": "item_text",
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "enableCheckAll": true,
      "itemsShowLimit": 3,
      "allowSearchFilter": true,
      "limitSelection": -1
    };
    this.facultyDropdownForm = this.fb.group({
      faculty: [this.selectedItems],
      technologies :[this.selectedTechnologies]
  });

  }

  onClick(){
    this.showStudents = true;
    console.log(this.facultyDropdownForm.value);
  }

  onChangeInput(event: Event) {
    const newInput: string = (event.target as HTMLInputElement).value;
    this.inputValue = newInput;
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
      console.log('onSelectAll', items);
  }
  toogleShowFilter() {
      this.ShowFilter = !this.ShowFilter;
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }


  handleLimitSelection() {
      if (this.limitSelection) {
          this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
      } else {
          this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
      }
  }

}
