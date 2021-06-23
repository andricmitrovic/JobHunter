import { Component, OnInit } from '@angular/core';
//import { RssToJsonService } from './rss_to_json';

@Component({
  selector: 'app-interesting-facts',
  templateUrl: './interesting-facts.component.html',
  styleUrls: ['./interesting-facts.component.css']
})
export class InterestingFactsComponent implements OnInit {
  //showDivWithNews : boolean;
  //rssToJson : RssToJsonService;

  constructor() {
      //this.showDivWithNews=false;
  }

  ngOnInit(): void {
  }

  // public convertRssUrlToJson(){
  //   this.rssToJson.getJsonFromXml();
  // };

}