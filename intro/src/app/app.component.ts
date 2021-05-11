import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'JobHunter';


  constructor() {
  }

  ngOnInit() {
    // Videti: https://semantic-ui.com/modules/tab.html#/examples
    $(".menu .item").tab();

    // $('.ui.dropdown').dropdown({
    //   action: 'nothing'
    // });
    // $('.ui.checkbox').checkbox();

    $('.ui.dropdown').dropdown();
  }

  


}
