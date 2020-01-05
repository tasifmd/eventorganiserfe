import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaderService } from 'src/app/service/http-header.service';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events : any[];
  message: any;
  constructor(private router: Router, private httpHeaderService: HttpHeaderService, private dataService: DataService,private httpService: HttpService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response: any) => {
        this.message = response;
        this.getEvents();
      }
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  getEvents() {
    console.log("Inside get events")
    this.httpHeaderService.getRequest("event").subscribe(
      (response : any) => {
        this.events = response;
      }
    );
  }

  addtocart(event) {
    console.log("add to cart");
    
  }
}
