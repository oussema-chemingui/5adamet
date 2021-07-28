import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm:FormGroup;
  submitted:boolean=false;
  constructor(private us:ServiceService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
       role:new FormControl(null, Validators.required),
      name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30),Validators.pattern("[a-zA-Z ]*$")]),
      password:new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z0-9]*$")]),
      email:new FormControl(null,[Validators.required,Validators.email]),

    })
  }
  getControls(){

    return this.registerForm.controls;

  }
  onSubmit(){
    this.submitted=true;
    if(this.registerForm.valid){
     console.log(this.registerForm.value);

      this.router.navigate(['/step',JSON.stringify(this.registerForm.value)] ,{ skipLocationChange: true})
      }


    //  }if(this.registerForm.value.role=="ServiceProvider"){
    
    //   this.us.postSPsignup(this.registerForm.value).subscribe(
    //     ()=>{
    //         this.router.navigateByUrl("/login")
    //     },
    //         err=>{ console.log(err)})
    //   }


    }
  }


