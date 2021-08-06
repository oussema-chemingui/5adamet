import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Cost } from '../models/cost.model';

@Component({
  selector: 'app-quoteresponse',
  templateUrl: './quoteresponse.component.html',
  styleUrls: ['./quoteresponse.component.css']
})
export class QuoteresponseComponent implements OnInit {
  username:any;
  fbForm: FormGroup;
  costusername : any;

  constructor( private activatedRoute: ActivatedRoute,private fb: FormBuilder,private us:ServiceService, private router: Router) {
    this.activatedRoute.queryParams.subscribe(
      params => {
         let data = JSON.parse(params['cost']);
         console.log('Got param: ', data);

      }
    )

   }

  ngOnInit(): void {

    let token=localStorage.getItem("token")
  if (token==null || localStorage.getItem("role")!=='ServiceProvider' ){
    localStorage.clear();
    alert("Unauthorized access")
    this.router.navigateByUrl("/login")
    setTimeout(()=>{
      window.location.reload();
    },10)
   }
this.username=localStorage.getItem("name")


   this.fbForm = this.fb.group({
    username: [''],
    service: ['', Validators.required],
    city:['', Validators.required],
    description: ['', Validators.required]
  });

  }


submit(fbForm){

}

}
