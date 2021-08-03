import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-serv-providers',
  templateUrl: './serv-providers.component.html',
  styleUrls: ['./serv-providers.component.css']
})
export class ServProvidersComponent implements OnInit {
  
  serviceProviderObjects:any[];
  usersObjects:any[];
  username:any;
  constructor(private us:ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("name")
    let token=localStorage.getItem("token")
    if(token==null || localStorage.getItem("role")!=='admin'){
      localStorage.clear();
      alert("Unauthorized access")
      this.router.navigateByUrl("/login")
      setTimeout(()=>{
        window.location.reload();
      },10)
    }


    this.us.getserviceproviders().subscribe(
      (res)=>{

      
        this.serviceProviderObjects=res;
        
      
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      })



      this.us.getusers().subscribe(
        (res)=>{
  
        
          this.usersObjects=res;
          
        
        },
        (err)=>{
          alert("Something went wrong")
          console.log(err)
        })
  
    
  }

  delete(providerObj){

    console.log(providerObj)
    this.us.deleteprovider(providerObj.id).subscribe(
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



  delete2(userObj){

    console.log(userObj)
    this.us.deleteuser(userObj.id).subscribe(
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


