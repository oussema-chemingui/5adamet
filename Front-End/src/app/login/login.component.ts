import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  submitted:boolean

  constructor(private us:ServiceService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      usertype:new FormControl(null,Validators.required),
      email:new FormControl(null, [
        Validators.required,
        Validators.email]),
      password:new FormControl(null, [
        Validators.required])
    })
  }


  getControls(){
    return this.loginForm.controls
  }



  onSubmit(){
    this.submitted=true;
  if(this.loginForm.valid){
    console.log(this.loginForm.value.usertype)
 if(this.loginForm.value.usertype=="ServiceProvider"){
this.us.getadminlogin(this.loginForm.value).subscribe(
  (res)=>{

    let tokenInfo = this.getDecodedAccessToken(res.accessToken);
    localStorage.setItem("name",tokenInfo.name)
    localStorage.setItem("token",res.accessToken)


     this.router.navigateByUrl("/adminaddservices")

  },
  (err)=>{
    console.log(err)
  }
)
 }else 
  if(this.loginForm.value.usertype=="user"){
    this.us.getuserlogin(this.loginForm.value).subscribe(
      (res)=>{
        //console.log(res)

        let tokenInfo = this.getDecodedAccessToken(res.accessToken);

        localStorage.setItem("name",tokenInfo.name)
        localStorage.setItem("token",res.accessToken)

        this.router.navigateByUrl("/dashboard")
 
      },
      (err)=>{
        console.log(err)
      }
    )
 }
}
    
}



goto(){
  return this.router.navigateByUrl("/signup")
}




getDecodedAccessToken(token: string): any {
  try{
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}
}
