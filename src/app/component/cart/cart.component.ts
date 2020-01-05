import { Component, OnInit } from '@angular/core';
import { HttpHeaderService } from 'src/app/service/http-header.service';
import { DataService } from 'src/app/service/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts : any[];
  message : any;
  constructor(private httpHeaderService: HttpHeaderService,private dataService : DataService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response: any) => {
        this.message = response;
        this.getCart();
      }
    );
  }

  getCart() {
    console.log("Inside get events")
    this.httpHeaderService.getRequest("event").subscribe(
      (response: any) => {
        this.carts = response;
      }
    );
  }

  book(cart) {
    this.httpHeaderService.postRequest("ticket/addtocart/"+cart.eventId,null).subscribe(
      (response: any) => {
        if (response.responseCode === 1000) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Ticket booked to cart ", "Close", { duration: 3000 });
        }
      },
      error => {
        this.snackBar.open("Failed to book ticket", "Close", { duration: 3000 });
      }
    );
  }
}
