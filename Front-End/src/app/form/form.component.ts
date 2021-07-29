import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Package } from '../interfaces/package';
import { User } from '../interfaces/user';
import { LinkService } from '../link.service';
import { OrderService } from '../order.service';

declare var Stripe;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  code: string;
  user: User;
  packages: Package[] = [];
  quantities: number[] = [];
  form: FormGroup;
  stripe: any;

  constructor(
    private linkService: LinkService, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.params.code;

    var stripe = Stripe(environment.stripe_key)

    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      country: '',
      city: '',
      zip: '',
    })

    this.linkService.get(this.code)
    .subscribe(res => {
      this.user = res.user;
      this.packages = res.packages;
      this.packages.forEach(p => {
        this.quantities[p.id] = 0;
      })
    })
  }


  total(): number{
    return this.packages.reduce((s, p) => s + p.price * this.quantities[p.id], 0)
  }

  submit(): void {
    const packages = this.packages.map(p => ({
      package_id: p.id,
      quantity: this.quantities[p.id]
    })).filter(p => p.quantity > 0);
    const data = {
      code: this.code,
      ...this.form.getRawValue()
    };
    this.orderService.create(data)
    .subscribe(res =>{
      this.stripe.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
