import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  array = [1, 2, 3, 4];
  public users:Array<string> = ["TUNIS","ARIANA","BIZERTE","BEN AROUS","MANOUBA","SOUSSE"];
  constructor(private router:Router) { }

  ngOnInit(): void {

  }

formsubmit(ref){
  let locationObj=ref.value
console.log(ref.value)
 this.router.navigateByUrl(`/mainservices/${this.users.indexOf(locationObj.location)}`)
}
gotologin(){
  return this.router.navigateByUrl("/mainservices")
}
}
