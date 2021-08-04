import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-quotedemand',
  templateUrl: './quotedemand.component.html',
  styleUrls: ['./quotedemand.component.css']
})
export class QuotedemandComponent implements OnInit  {
  servicesArray:any[];
  services=["cleaning","plumbing","carpenter","painter","saloon for men","saloon for women","pest control","Applaince Repair"]
  constructor(private us:ServiceService , private router: Router,) { }
  ngOnInit(): void {
    this.us.getservices().subscribe(
      (res)=>{
        console.log(res)
        this.servicesArray=res
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      })
    
}

formData = new FormData()
postDemand(ref){

  let {description,main_service,date} = ref.value

this.formData.append('date',date)
this.formData.append('description',description)
this.formData.append('main_service',main_service)

  this.us.createQuotedemand(this.formData).subscribe(
    ()=>{
     
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
      } ,err=>{
      alert("Something went wrong")
      console.log(err)
    }
  )
}

}
