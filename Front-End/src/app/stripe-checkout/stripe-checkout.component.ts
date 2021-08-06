import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})
export class StripeCheckoutComponent implements OnInit {

  strikeCheckout:any = null;

  constructor(private us: ServiceService, private router:Router) { }

  ngOnInit() {
    this.stripePaymentGateway();
  }
  
  checkout(amount) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JIHGvGxTSCMpMzvLqWsnwJTntnwd0vDuelDJlbPWiuWUNd9tgUnJeK1evn6jyraRIbRs0eBBBezKSKpnnHdRhcM00TkByFUTs',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
        this.us.addQuote(10).subscribe()
      }
    });
  
    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }
  
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'sk_test_51JIHGvGxTSCMpMzviFk0SxP2kyDHuIIUhj2THEmrQ2n1PILw36G6M2THNHMWD3w6bczoBVk0s9trmNH8bDTLDt5q00mdbxSZUf',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
            
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }

}
