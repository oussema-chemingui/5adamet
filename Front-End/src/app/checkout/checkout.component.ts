import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

declare var Stripe;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  stripe: any;

  constructor() { }

  ngOnInit(): void {
    this.stripe = Stripe(environment.stripe_key);
  }

}
