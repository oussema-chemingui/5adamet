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
services=["Cleaning","Plumbing","Carpenter","Painter","Gardening","HVAC ","Pest control","Applaince Repair"]
constructor(private us:ServiceService, private router:Router){}
  ngOnInit(){
    
    let tokenverify=localStorage.getItem("token")
    if(tokenverify==null || localStorage.getItem("role")!=='admin'){
      localStorage.clear();
      alert("Unauthorized access")
   this.router.navigateByUrl("/home")
   setTimeout(()=>{
    window.location.reload();
  },10)
    }
      this.us.getservices().subscribe(
      (res)=>{

        console.log(res)
        this.servicesArray=res
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

    let {name,cost,description,main_service} = ref.value

    //serviceObj.status=true;
    this.formData.append("image",this.file,this.file.name)
    //this.formData.append("serviceObj",JSON.stringify(serviceObj))
 this.formData.append('name',name)
 this.formData.append('cost',cost)
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
  
  
      console.log(serviceObj.id)  
  this.us.deleteservices(serviceObj.id).subscribe(
    ()=>{
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    },
    (err)=>{
      console.log(err)
    }
  )

  var newObjcart={
    name:serviceObj.name,
    cost:serviceObj.cost,
    image:serviceObj.image,
    main_service:serviceObj.main_service
      };
  
      console.log(newObjcart)  
  this.us.deletecartfrmadmin(newObjcart).subscribe(
    ()=>{

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });

      },
      (err)=>{
      console.log(err)
      }
      )
    }

    
}