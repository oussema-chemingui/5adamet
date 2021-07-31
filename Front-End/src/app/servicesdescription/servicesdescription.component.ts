import { Component, OnInit, Input } from '@angular/core';
import {Service} from '../Service';


@Component({
  selector: 'app-servicesdescription',
  templateUrl: './servicesdescription.component.html',
  styleUrls: ['./servicesdescription.component.css']
})
export class ServicesdescriptionComponent implements OnInit {
  @Input() service:Service;

  constructor() { }

  ngOnInit(): void {
  }

}
