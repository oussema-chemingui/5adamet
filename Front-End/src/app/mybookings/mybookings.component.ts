import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {
  cartitemsobj:any[];
  costs: Array<any> =  [];
  totalprice:any;
  username:any;
  numberofitems:any;
  quantity:any
  skills:any[];
 q=1;
  checkoutForm:FormGroup
    constructor(private us:ServiceService, private ac:ActivatedRoute , private router:Router) { }
    
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
     
    
      


      this.checkoutForm=new FormGroup({
        firstname:new FormControl(null,Validators.required),
        email:new FormControl(null,[
          Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
          address:new FormControl(null, [
          Validators.required]),
          cardname:new FormControl(null, [
            Validators.required]),
          city:new FormControl(null,[
            Validators.required
          ]),
          state:new FormControl(null, [
            Validators.required
          ]),
          zip:new FormControl(null, [
            Validators.required
          ]),
            cardnumber:new FormControl(null, [
              Validators.required,
             Validators.maxLength(12),
             Validators.minLength(12),
            Validators.pattern("[0-9]*$")]),
              expmonth:new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z]*$")]),
                
                expyear:new FormControl(null, [
                  Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(4)]),
                  cvv:new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(3),
                    Validators.minLength(3),
                   Validators.pattern("[0-9]*$")])
      })
    }
   
    formData=new FormData()
    deletefrmcart(obj){
 

    console.log('idddd',obj.id) 

this.us.deletefrmcart(obj.id).subscribe(
  ()=>{

    console.log('service deleted')
   

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
    getControls(){
      return this.checkoutForm.controls
    }
  logout(){
     localStorage.clear();
     this.router.navigateByUrl("/home")
    }
    
    onSubmit(){
 console.log(this.checkoutForm.value)
    }
    
    

    submitorder(){
      if(this.checkoutForm.valid){
      alert("Successfully Placed Order")

      this.router.navigateByUrl(`success`)}
    }



    askforcost(){
      this.router.navigateByUrl('costestimation')
    }

    

}
