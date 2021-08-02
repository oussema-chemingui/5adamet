import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  loggedInuser = false;
  loggedInadmin = false;
  loggedInsp = false;
  loggedIn = false;

  constructor( private router:Router) { }

  ngOnInit(): void {
console.log('start',this.loggedIn)
  if (localStorage.getItem("token")&&(localStorage.getItem("role")=='user')){
     this.loggedInuser = true;
      this.loggedIn = true;
    }else if (localStorage.getItem("token")&&(localStorage.getItem("role")=='admin')){
       this.loggedInadmin = true; 
        this.loggedIn = true;
      }else if (localStorage.getItem("token")&&(localStorage.getItem("role")=='ServiceProvider')){
         this.loggedInsp = true; 
          this.loggedIn = true;
        }else if(localStorage.getItem("token")) {
           this.loggedIn = true
        }
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl(`/home`)
    setTimeout(()=>{
      window.location.reload();
    },10)
    
  }


  

}
