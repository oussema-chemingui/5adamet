import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent implements OnInit {

  contactForm: FormGroup;
  submitted:boolean;
  
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    
    this.contactForm=new FormGroup({
   
     name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30),Validators.pattern("[a-zA-Z ]*$")]),
     email:new FormControl(null,[Validators.required,Validators.email]),
     subject:new FormControl(null, Validators.required),
     message:new FormControl(null, Validators.required),

   })

  }


  onSubmit() {

    
  }

        
  }

