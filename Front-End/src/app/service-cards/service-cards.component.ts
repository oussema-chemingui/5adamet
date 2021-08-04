import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.css']
})
export class ServiceCardsComponent implements OnInit {
  servicesArray=[];

  cartitemsobj:any;
  numberofitems:number;

  username=localStorage.getItem("name")
  email=localStorage.getItem("email")
  phone=localStorage.getItem("phone")
  address=localStorage.getItem("address")
  constructor(private us:ServiceService, private router:Router) { }

  ngOnInit(): void {

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
  addtocart(service){
    
    // console.log("SERVICEEEEEE",service)
     let serviceObj = {"username":this.username,"main_service":service.main_service,"service_name":service.name,"cost":service.cost,"image":service.image ,"quantity":1};
     console.log("in compo",serviceObj)
     this.us.addtocart(serviceObj).subscribe(
       (res)=>{
         if(res){
       console.log('successssss')
        this.us.getservicetocart().subscribe(
         res=>{
           console.log(res)
           
           this.numberofitems=this.cartitemsobj.length;
         },
         err=>{alert("something went wrong")
       console.log(err)}
       )
       }else{
         alert("service already Added")
       }
     },
       (err)=>{
         alert("Something went wrong")
         console.log(err)
       }
     )
   }
}
