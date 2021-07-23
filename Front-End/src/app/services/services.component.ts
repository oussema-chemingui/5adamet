import { Component, OnInit } from '@angular/core';
import {SERVICES} from '../mock-services';
import {Service} from '../Service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[]= SERVICES;

  constructor() { }

  ngOnInit(): void {
  }

}
