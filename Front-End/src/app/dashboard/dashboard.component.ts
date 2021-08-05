import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  servicesArray=[];
  checkbox:any;
  mainservicename:any;
  maincategories=["Cleaning","Plumbing","Carpenter","Painter","Gardening","HVAC ","Pest control","Applaince Repair"]
  selectedcategory:any;
  cartitemsobj:any;
  numberofitems:number;
  username=localStorage.getItem("name")
  email=localStorage.getItem("email")
  phone=localStorage.getItem("phone")
  address=localStorage.getItem("address")
  
  constructor(private us:ServiceService, private router:Router) { }
   id:Number=0;


  ngOnInit(): void {
    let tokenverify=localStorage.getItem("token")
    if(tokenverify==null || localStorage.getItem("role")!=='user'){
      localStorage.clear();
      alert("Please login to access dashboard")
this.router.navigateByUrl("/login")
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
    
    this.us.getservicetocart().subscribe(
     res=>{
       console.log(res)
       this.cartitemsobj=res
       this.numberofitems=this.cartitemsobj.length;
     },
     err=>{alert("something went wrong")
   console.log(err)}
   )
  }


  
  logout(){
    localStorage.clear()
    this.router.navigateByUrl(`/login`)
  }


  bookings(){
  
    this.router.navigateByUrl(`/mybookings`)
  }



  addtocart(service){
    
   // console.log("SERVICEEEEEE",service)
    let serviceObj = {"username":this.username,"main_service":service.main_service,"service_name":service.name,"cost":service.cost,"image":service.image ,"quantity":1};
    console.log("in compo",serviceObj)
    this.us.addtocart(serviceObj).subscribe(
      (res)=>{
        if(res){
      console.log('successssss')
      alert('service added please check your cart')
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

  askforcost(){
    this.router.navigateByUrl('costestimation')
  }




  load(){

    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }



  search(){
    if(this.mainservicename!=""){
    this.servicesArray=this.servicesArray.filter(res=>{
      console.log('FILTEEEEEERRRRRRRR',res)
      return (res.name.toLocaleLowerCase().match(this.mainservicename.toLocaleLowerCase()))||
     (res.main_service.toLocaleLowerCase().match(this.mainservicename.toLocaleLowerCase()))
    })}
    else{
      this.ngOnInit();
    }
  }




  searchcategory(ref){
    this.selectedcategory=ref.value;
    console.log(this.selectedcategory)
    if(this.selectedcategory!=""&& this.selectedcategory.Cleaning==true){
      console.log("in comp search category ",this.selectedcategory.Cleaning)
  
        let selectedvalue="Cleaning";
    this.servicesArray=this.servicesArray.filter(res=>{
      console.log('CATEGORYYYY',res)
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })} else    if( this.selectedcategory.Plumbing==true){
      console.log("in comp search category ",this.selectedcategory.Plumbing)
  
        let selectedvalue="Plumbing";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory.Carpenter==true){
      console.log("in comp search category ",this.selectedcategory.Carpenter)
  
        let selectedvalue="Carpenter";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory.Painter==true){
      console.log("in comp search category ",this.selectedcategory.Painter)
  
        let selectedvalue="Painter";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["Gardening"]==true){
      console.log("in comp search category ",this.selectedcategory["Gardening"])
  
        let selectedvalue="Gardening";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["HVAC "]==true){
      console.log("in comp search category ",this.selectedcategory["HVAC "])
  
        let selectedvalue="HVAC ";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["Pest control"]==true){
      console.log("in comp search category ",this.selectedcategory["Pest control"])
  
        let selectedvalue="Pest control";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["Applaince Repair"]==true){
      console.log("in comp search category ",this.selectedcategory["Applaince Repair"])
  
        let selectedvalue="Applaince Repair";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.main_service.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
   
    else{
      this.ngOnInit();
    }
  }
  

  
}

