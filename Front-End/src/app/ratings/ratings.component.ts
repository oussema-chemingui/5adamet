import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {


  username:any;
  count: number = 0;
  reviews:Array<UserReview> = [];
 
  isAdmin=false;
  isUser=false;
  constructor(private http:HttpClient, private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private router:Router,private us:ServiceService,) { }

  ngOnInit(): void {
 
    if (localStorage.getItem("token")&&(localStorage.getItem("role")=='admin')){
      this.isAdmin =true ; 

    }if (localStorage.getItem("token")&&(localStorage.getItem("role")=='user')){
      this.isUser =true ;
    }
    
    this.username=localStorage.getItem("name")
    let token=localStorage.getItem("token")
    if (token==null || localStorage.getItem("role")=='ServiceProvider' ){
      localStorage.clear();
      alert("Unauthorized access")
      this.router.navigateByUrl("/login")
      setTimeout(()=>{
        window.location.reload();
      },10)
    }



    const s = this.renderer2.createElement('script');
   s.onload = this.loadNextScript.bind(this);
   s.type = 'text/javascript';
   s.src = 'rating.js'; // Defines someGlobalObject
   s.text = ``;
   this.renderer2.appendChild(this._document.body, s);
    this.getData();






  }


  loadNextScript() {
    const s = this.renderer2.createElement('script');
    s.text = `
    // This would error, if previous script has not yet been loaded
     someGlobalObject.doSomething();
 `
    this.renderer2.appendChild(this._document.body, s);
 }
 
 
 getData(){
    this.http.get('http://localhost:3000/reviews/getreviews').pipe(map(res=>{
      const revArray = [];
      for(const key in res){
        revArray.push({...res[key]});
      }
      return revArray;
    }))
    .subscribe(res =>{
      this.reviews = res;
      this.count = this.reviews.length;
      console.log('Reviewssss',this.reviews);
    })
  }

  
  delete(rev){

    this.us.deletereview(rev.id).subscribe(
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
interface UserReview{
  rating:number;
  username:string;
  city?:string;
  feedback?:string;
  contact:string;
  date:string;
  sp_name:string;
  dp?: File;
}
