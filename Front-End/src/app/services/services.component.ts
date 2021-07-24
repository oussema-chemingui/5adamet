import { Component, OnInit } from '@angular/core';
import {Service} from '../Service';
import { ServiceService } from './service.service'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[]= [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getServices()
    .subscribe((services) =>(this.services = services))
  }

}
