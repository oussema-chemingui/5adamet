import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-quotedemand',
  templateUrl: './quotedemand.component.html',
  styleUrls: ['./quotedemand.component.css']
})
export class QuotedemandComponent  {
  services=["Cleaning","Plumbing","Carpenter","Painter","Gardening","HVAC ","Pest control","Applaince Repair"]


  fbForm: FormGroup;
  service:string;
  obj:UserCost;
  date:string;
  day:string;
  month:string;
  year:string;
  username:any;
  constructor(private fb: FormBuilder, private us:ServiceService, private router: Router){}


  ngOnInit(): void {
  let token=localStorage.getItem("token")
  if (token==null || localStorage.getItem("role")=='ServiceProvider' ){
    localStorage.clear();
    alert("Unauthorized access")
    this.router.navigateByUrl("/login")
    setTimeout(()=>{
      window.location.reload();
    },10)
   }



   this.fbForm = this.fb.group({
    username: [''],
    service: ['', Validators.required],
    city:[''],
    description: ['', Validators.required]
  });




  }

  submit(form: NgForm){}


}

interface UserCost{
  service:number;
  username:string;
  city?:string;
  description?:string;
  date:string;

 
}
