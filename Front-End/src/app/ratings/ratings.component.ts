import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  sample:UserReview = {
    rating:4,
    userName:"Shoadevs",
    feedback:"Very good I loved it but blah blah lorem ipsum",
    url:"www.facebook.com",
    city:"Berlin",
    country:"Germany",
    verified:true,
    date: '10/01/2020'

  }
  sample1:UserReview = {
    rating:5,
    userName:"Shoa",
    feedback:"Very good I loved it but blah blah lorem ipsum",
    url:"www.instagram.com",
    city:"Berlin",
    country:"Germany",
    verified:false,
    date: '10/01/2020'
  }
  count: number = 0;
  reviews:Array<UserReview> = [];
  constructor(private http:HttpClient, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit(): void {
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
    this.http.get('http://localhost:8080/api/getReviews').pipe(map(res=>{
      const revArray = [];
      for(const key in res){
        revArray.push({...res[key]});
      }
      return revArray;
    }))
    .subscribe(res =>{
      this.reviews = res;
      this.count = this.reviews.length;
      console.log(this.reviews);
    })
    //this.reviews.push(this.sample);
    //this.reviews.push(this.sample1);
  }
  /*starFour(rev){
    let color= 'rgb(87, 86, 86)';
    if(rev>=4){
      color = '#fd4';
    }
    return color;
  }*/
}
interface UserReview{
  rating:number;
  userName:string;
  url?:string;
  city?:string;
  country?:string;
  feedback?:string;
  verified?:boolean;
  date:String;
  dp?: File;
}
