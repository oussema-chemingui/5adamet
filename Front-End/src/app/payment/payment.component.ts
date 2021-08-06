import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  checkoutForm:FormGroup
  constructor(private us:ServiceService, private ac:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {




    this.checkoutForm=new FormGroup({
      firstname:new FormControl(null,Validators.required),
      email:new FormControl(null,[
        Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
        address:new FormControl(null, [
        Validators.required]),
        cardname:new FormControl(null, [
          Validators.required]),
        city:new FormControl(null,[
          Validators.required
        ]),
        state:new FormControl(null, [
          Validators.required
        ]),
        zip:new FormControl(null, [
          Validators.required
        ]),
          cardnumber:new FormControl(null, [
            Validators.required,
           Validators.maxLength(12),
           Validators.minLength(12),
          Validators.pattern("[0-9]*$")]),
            expmonth:new FormControl(null, [
              Validators.required,
              Validators.pattern("[a-z]*$")]),
              
              expyear:new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4)]),
                cvv:new FormControl(null, [
                  Validators.required,
                  Validators.maxLength(3),
                  Validators.minLength(3),
                 Validators.pattern("[0-9]*$")])
    })


  }



  getControls(){
    return this.checkoutForm.controls
  }


  
  submitorder(){
    if(this.checkoutForm.valid){
    alert("Successfully Placed Order")

    this.router.navigateByUrl(`success`)}
  }


  onSubmit(){
    console.log(this.checkoutForm.value)
       }
}
