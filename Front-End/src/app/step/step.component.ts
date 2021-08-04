import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  registerForm:FormGroup;
  User: User;
  submitted:boolean=false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private us:ServiceService
  ) {
    this.User = JSON.parse(activatedRoute.snapshot.params["User"]);
    
  }

  ngOnInit(): void {
    console.log(this.User)
    this.registerForm=new FormGroup({
      role:new FormControl(null, Validators.required),
     name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30),Validators.pattern("[a-zA-Z ]*$")]),
     password:new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z0-9]*$")]),
     email:new FormControl(null,[Validators.required,Validators.email]),
     address:new FormControl(null, Validators.required),
     phone:new FormControl(null, Validators.required),

   })
   this.registerForm.patchValue({
     role:this.User.role,
     name:this.User.name,
     password:this.User.password,
     email:this.User.email,
     phone:this.User.phone,
     address:this.User.address,
    })
  }
  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }



  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  refresh($event: boolean) {
    this.next()
  }
  updateUser($event: string) {
    console.log($event)
    Object.assign(this.User, $event);
     JSON.stringify(this.User);
    console.log('tryyyyy',this.User)
  }
  done(): void {
    // console.log('finaluser',this.User);
    // this.authService.register(this.User).subscribe(res=>{
    //   console.log(res)
    //   this.router.navigate(['/login'])
    // })

  }

  onSubmit(){

    this.submitted=true;
    if(this.registerForm.valid){
     console.log('SUBMIIIIIITTTTT',this.registerForm.value);
     
     if(this.registerForm.value.role=="user"){

      this.us.postusersignup(this.registerForm.value).subscribe(
        ()=>{
            this.router.navigateByUrl("/login")
        },
            err=>{ console.log(err)})
      }else if(this.registerForm.value.role=="ServiceProvider"){
    
      this.us.postSPsignup(this.registerForm.value).subscribe(
        ()=>{
            this.router.navigateByUrl("/login")
            
        },
            err=>{ console.log(err)})
      }
    }
  }

      




      getControls(){

        return this.registerForm.controls;
    
      }
}
