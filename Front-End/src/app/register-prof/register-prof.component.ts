import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent implements OnInit {

  contactForm: FormGroup;
  submitted:boolean;
  
  constructor(private formBuilder: FormBuilder ,private us:ServiceService , private router: Router,) { }
  ngOnInit(): void {
    
    this.contactForm=new FormGroup({
   
     name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30),Validators.pattern("[a-zA-Z ]*$")]),
     email:new FormControl(null,[Validators.required,Validators.email]),
     subject:new FormControl(null, Validators.required),
     message:new FormControl(null, Validators.required),

   })

  }


  onSubmit() {
    if(this.contactForm.valid){

      console.log('SUBMIIIIIITTTTT',this.contactForm.value);
      this.us.postcontactdata(this.contactForm.value).subscribe(
        ()=>{
           alert('Message Delivered Please Check Your Email')
        },
            err=>{ console.log(err)})

    }
    
  }

        
  }

