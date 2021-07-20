import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 constructor(private hc:HttpClient) {}
postadminsignup(userobj):Observable<any>{
  return this.hc.post("/admin/createadmin",userobj)
}
postusersignup(userobj):Observable<any>{
  return this.hc.post("/user/createuser",userobj)
}
 getadminlogin(userObj):Observable<any>{
return this.hc.post("/admin/adminlogin",userObj)
 }
 getuserlogin(userObj):Observable<any>{
  return this.hc.post("/user/userlogin",userObj)
   }
   
   postprofdata(profObj):Observable<any>{
     return this.hc.post("/professional/createprof",profObj)
   }       
   getprofessionaldetails():Observable<any>{
     return this.hc.get("/professional/getdetails")
   }
  
}
