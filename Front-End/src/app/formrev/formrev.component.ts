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

  serviceProviderObjects:any[];
  serviceProvider: Array<any> =  [];
  username:any;

  constructor(private fb: FormBuilder, private us:ServiceService, private router: Router) { }

  ngOnInit(): void {

    this.username=localStorage.getItem("name")
    let token=localStorage.getItem("token")
    if(token==null || localStorage.getItem("role")=='ServiceProvider' ){
      localStorage.clear();
      alert("Unauthorized access")
      this.router.navigateByUrl("/login")
      setTimeout(()=>{
        window.location.reload();
      },10)
    }





    this.fbForm = this.fb.group({
      username: ['', Validators.required],
      sp_name: ['', Validators.required],
      contact: ['', Validators.required],
      city:[''],
      feedback: ['', Validators.required]
    });

    


    this.us.getserviceproviders().subscribe(
      (res)=>{

      
        this.serviceProviderObjects=res;
        
        this.serviceProviderObjects.forEach(elem =>{
          this.serviceProvider.push(elem.name)
     })
     console.log(this.serviceProvider)
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      }
    )

    
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
    console.log(form.value.sp_name);
    this.obj = {
      username:form.value.name,
      sp_name:form.value.sp_name,
      contact:form.value.contact,
      rating:this.rating,
      date:this.date,
      city:form.value.city,
      feedback:form.value.feedback,
     
    }
    console.log('Reviews',this.obj);
    this.us.postreview( this.obj).subscribe(
      () =>{
    
      console.log('review added')
   
      form.reset();
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  
    },
    (err)=>{
      console.log(err)
    })
     
  }

}
interface UserReview{
  rating:number;
  username:string;
  city?:string;
  feedback?:string;
  contact:string;
  date:string;
  sp_name:string;
  dp?: File;

}
