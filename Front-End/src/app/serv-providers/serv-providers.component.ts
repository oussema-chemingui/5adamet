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

  constructor(private us:ServiceService, private router: Router) { }

  ngOnInit(): void {

    this.us.getserviceproviders().subscribe(
      (res)=>{

      
        this.serviceProviderObjects=res;
        
      
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


}


