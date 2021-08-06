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
  
  
  
  fbForm: FormGroup;


  obj:SpAnswer;
  date:string;
  day:string;
  month:string;
  year:string;
  username:any;
  usernm:any;

  constructor( private activatedRoute: ActivatedRoute,private fb: FormBuilder,private us:ServiceService, private router: Router) {
    this.activatedRoute.queryParams.subscribe(
      params => {
         let data = JSON.parse(params['cost']);
         console.log('DATAAA', data);
         console.log('USERR', data.username);
         this.usernm=data.username;
         console.log('USERRrr22', this.usernm);
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
    total:['', Validators.required],
    description: ['', Validators.required],

  });

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




  formData = new FormData()

submit(fbForm){
  console.log(fbForm.value)
  this.date = this.createDate();

  this.obj = {
    username: this.usernm,
    spname: this.username,
    date:this.date,
    total: fbForm.value.total,
    description:fbForm.value.description,
   
  }
  console.log('ANSWER',this.obj);

  this.us.postcreateanswer(this.obj).subscribe(
    () =>{
  
    console.log('answer sent')
   alert('ANSWER SENT BACK TO COSTUMER')
    fbForm.reset();
  },
  (err)=>{
    console.log(err)
  })


}

}

interface SpAnswer{
  
  username:string;
  total:number;
  description?:string;
  date:string;
  spname:string;
 
}
