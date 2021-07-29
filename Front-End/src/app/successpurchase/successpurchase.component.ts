import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-successpurchase',
  templateUrl: './successpurchase.component.html',
  styleUrls: ['./successpurchase.component.css']
})
export class SuccesspurchaseComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const source = this.route.snapshot.queryParams.source;

    this.orderService.confirm({
      source
    })
    .subscribe(res => console.log(res))
  }

}
