import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent implements OnInit {

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  step = 1;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
        this.personalDetails = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['',Validators.required]
        });
        this.addressDetails = this.formBuilder.group({
            city: ['', Validators.required],
            address: ['', Validators.required],
            pincode: ['',Validators.required]
        });
        
  }
  get personal() { return this.personalDetails.controls; }
  get address() { return this.addressDetails.controls; }
  next(){
    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }

    if(this.step==2){
        this.address_step = true;
        if (this.addressDetails.invalid) { return }
            this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.address_step = false;
    }
  }
  submit(){
    if(this.step==2){
      this.address_step = true;
      if (this.addressDetails.invalid) { return }
    }


    console.log(this.personal)

  }
}