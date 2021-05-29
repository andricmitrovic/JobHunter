import { Component, OnInit, ElementRef, Input} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from './../../students/services/student.service';
import { Student } from './../../students/models/student';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  @Input() student!: Student | null;
  showLogin : boolean;
  showProfile : boolean;
  sub! : Subscription;

  constructor(location: Location,  private element: ElementRef, private router: Router, private studentService: StudentService) {
    this.location = location;
    this.showLogin = (this.student != null);
    this.showProfile = true;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    if (this.studentService.sendUserDataIfExists()==null) {
      this.showProfile = false;
    }
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  public Logout(){
    this.studentService.logouStudent();
    this.showLogin = false;
  }

}
