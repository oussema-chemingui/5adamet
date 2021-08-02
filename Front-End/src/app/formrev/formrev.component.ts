import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, Form } from '@angular/forms';
import {  FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';

import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './formrev.component.html',
  styleUrls: ['./formrev.component.css']
})
export class FormRevComponent implements OnInit {
  fbForm: FormGroup;
  rating:number;
  obj:UserReview;
  date:string;
  day:string;
  month:string;
  year:string;
  constructor(private fb: FormBuilder, private us:ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.fbForm = this.fb.group({
      userName: ['', Validators.required],
      contact: ['', Validators.required],
      city:[''],
      feedback: ['', Validators.required]
    });
  }
  rateFive(){
    this.rating = 5;
  }
  rateFour(){
    this.rating = 4;
  }
  rateThree(){
    this.rating = 3;
  }
  rateTwo(){
    this.rating=2;
  }
  rateOne(){
    this.rating = 1;
  }
  createDate(){
    var numday = new Date().getDate();
    this.day = numday.toString();
    numday = new Date().getMonth();
    this.month = numday.toString();
    numday = new Date().getFullYear();
    this.year = numday.toString();
    this.date = this.day + "/" + this.month + "/" + this.year;
    return this.date;
  }
  submit(form: NgForm){
    this.date = this.createDate();
    
    if(!form.valid){
      return;
    }
    console.log(form.value.city);
    this.obj = {
      userName:form.value.name,
      contact:form.value.contact,
      rating:this.rating,
      date:this.date,
      city:form.value.city,
      
      feedback:form.value.feedback,
     
    }
    console.log(this.obj);
    this.us.postreview( this.obj).subscribe(resData =>{
      console.log(resData);
    });
   // this.router.navigate(['/']);
    form.reset();
  }

}
interface UserReview{
  rating:number;
  userName:string;
  city?:string;
  feedback?:string;
  contact:string;
  date:string;
  dp?: File;

}
