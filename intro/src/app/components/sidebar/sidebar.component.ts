import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from './../../students/services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtService } from './../../../services/jwt.service';
import { Student } from './../../students/models/student';
import { HtmlParser } from '@angular/compiler';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  @Input() student!: Student | null;
  showLogin : boolean;
  sub! : Subscription;

  constructor(private router: Router, private studentService: StudentService) { }

  public Logout(){
    console.log("Logout!");
    this.studentService.logouStudent();
  }

  ngOnInit() {
    
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
    if (this.studentService.sendUserDataIfExists()==null) {
      let side_routes = this.menuItems;
      for (let side_route of side_routes) {
        if (side_route.path == "/user-profile") {
          side_routes.splice(side_routes.indexOf(side_route),1);
        }
      }

      this.menuItems = side_routes;
    }

    
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
