import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaderService } from 'src/app/service/http-header.service';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { MatSnackBar,MatDialog } from '@angular/material';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events: any[];
  message: any;
  constructor(private router: Router,public dialog: MatDialog, private snackBar: MatSnackBar, private httpHeaderService: HttpHeaderService, private dataService: DataService, private httpService: HttpService) { }

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
      (response: any) => {
        this.events = response;
      }
    );
  }

  addtocart(event) {
    console.log("add to cart");
    this.httpHeaderService.postRequest("/ticket/addtocart/" + event.eventId, null).subscribe(
      (response: any) => {
        if (response.responseCode === 1000) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Ticket added to cart ", "Close", { duration: 3000 });
        }
      },
      error => {
        this.snackBar.open("Failed to add in cart", "Close", { duration: 3000 });
      }
    );
  }

  myCart() {
    console.log("Inside update vehicle");
    const dialogRef = this.dialog.open(CartComponent, {
      width: '1000px', height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
} 
