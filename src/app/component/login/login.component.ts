import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any;
  'email' = new FormControl('', [Validators.required]);
  'password' = new FormControl('', [Validators.required]);
  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login() {
    this.loginData = {
      "userEmail": this.email.value,
      "password": this.password.value
    };
    this.httpService.postRequest("user/login", this.loginData).subscribe(
      (response: any) => {
        if (response.responseCode == 1000) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
          console.log("login success")
          console.log(response)
        }
      },
      error => {
        console.log("Login failed")
        this.snackBar.open("Login failed", "Close", { duration: 3000 });
      }
    );
  }
}
