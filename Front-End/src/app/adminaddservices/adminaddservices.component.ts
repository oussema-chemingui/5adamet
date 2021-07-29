import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-adminaddservices',
  templateUrl: './adminaddservices.component.html',
  styleUrls: ['./adminaddservices.component.css']
})
export class AdminaddservicesComponent implements OnInit {
  servicesArray:any[];
services=["cleaning","plumbing","carpenter","painter","saloon for men","saloon for women","pest control","Applaince Repair"]
constructor(private us:ServiceService, private router:Router){}
  ngOnInit(){
    let tokenverify=localStorage.getItem("token")
    if(tokenverify==null){
      alert("Unauthorized access")
this.router.navigateByUrl("/home")
    }
    this.us.getservices().subscribe(
      (res)=>{
        this.servicesArray=res["message"]
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }
  

  file:File;
  incomingfile(event){

   this.file = event.target.files[0]
  
  }

 formData = new FormData()

  addservices(ref){

    let {name,coast,description,main_service} = ref.value

    //serviceObj.status=true;
    this.formData.append("image",this.file,this.file.name)
    //this.formData.append("serviceObj",JSON.stringify(serviceObj))
 this.formData.append('name',name)
 this.formData.append('coast',coast)
 this.formData.append('description',description)
 this.formData.append('main_service',main_service)

   

    this.us.postservices(this.formData).subscribe(
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


  
update(serviceId){
  this.router.navigateByUrl(`/update/${serviceId}`)
}

 delete(serviceObj){
  var newObj={
    serviceId : serviceObj.serviceId,
    mainservice :serviceObj.mainservice,
    subservice:serviceObj.subservice,
    status:false,
    price:serviceObj.price,
    discreption:serviceObj.discreption,
    image:serviceObj.image
      };
  
      console.log(newObj)  
  this.us.deleteservices(newObj).subscribe(
    (res)=>{
      console.log(res["message"])
      if(res["message"]=="deleted the service"){
      alert("Deleted a service")
     
  
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  
      }else{
        alert("something went Wrong")
      }
    },
    (err)=>{
      console.log(err)
    }
  )

  var newObjcart={
    subservice:serviceObj.subservice,
    price:serviceObj.price,
    status:false,
    image:serviceObj.image
      };
  
      console.log(newObjcart)  
  this.us.deletecartfrmadmin(newObjcart).subscribe(
    (res)=>{
      if(res["message"]=="deleted the service"){
      alert("Deleted a service in cart")
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  
 }else{
  alert("something went Wrong")
}
},
(err)=>{
console.log(err)
}
)



}
}