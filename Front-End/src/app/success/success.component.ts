import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
skills:any
username:any
cartitemsobj:any[];
costs: Array<any> =  [];
totalprice:any;
numberofitems:any
quantity:any
profdetails=[];
newprof=[]
  constructor(private us:ServiceService,private ac:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
   
    
    this.username=localStorage.getItem("name")
      let token=localStorage.getItem("token")
      if(token==null || localStorage.getItem("role")!=='user'){
        localStorage.clear();
        alert("Unauthorized access")
        this.router.navigateByUrl("/login")
        setTimeout(()=>{
          window.location.reload();
        },10)
      }
      this.us.getservicetocart().subscribe(
        res=>{
          
          this.cartitemsobj=res.filter(res =>{
          console.log('ITEMMM',res)
            return (res.username.toLocaleLowerCase().match(this.username.toLocaleLowerCase()))
          })
          this.numberofitems = this.cartitemsobj.length

         this.cartitemsobj.forEach(elem =>{
              this.costs.push(elem.cost)

         })

     this.totalprice=this.costs.reduce((a, b) => a + b, 0)
     console.log('totaaall',this.totalprice)
         
        },
        err=>{alert("something went wrong")
      console.log(err)}
      )


}

}
