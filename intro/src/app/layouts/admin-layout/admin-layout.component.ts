import { Component, Input, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Observable, Subscription } from 'rxjs';
import { JwtService } from '../../../services/jwt.service'

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private jwtService: JwtService) { 
  }

  ngOnInit() {
   
  }

  ngOnDestroy() {
  }

}
