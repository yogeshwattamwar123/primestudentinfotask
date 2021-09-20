import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-primenumber',
  templateUrl: './primenumber.component.html',
  styleUrls: ['./primenumber.component.css']
})
export class PrimenumberComponent implements OnInit {
  txtprime: any;
  numberarray = [];
  output = [];

  constructor() { }

  ngOnInit(): void {
  }

  filterprime() {
    console.log(this.txtprime.split(","));
    this.numberarray.push(this.txtprime.split(","));
    console.log(this.numberarray[0]);
    this.numberarray[0].map((value, i) => {
    if(this.isPrime(value)) {
      this.output.push(`${value} is prime number`);
    }
    else {
      this.output.push(`${value} is not prime number`);
    }
    })
  }

  isPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num > 1;
  }
}
