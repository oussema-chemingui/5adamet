import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  code: string;

  constructor(
    private linkService: LinkService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.params.code;
    this.linkService.get(this.code)
    .subscribe(res => {
      console.log(res)
    })
  }

}
