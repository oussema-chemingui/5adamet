import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 
  API_SERVER = "http://localhost:3000";
  
 constructor(private hc:HttpClient) {}
postadminsignup(userobj):Observable<any>{
  return this.hc.post(`${this.API_SERVER}/auth/admins/signup`,userobj)
}


postSPsignup(userobj):Observable<null>{
  return this.hc.post<null>(`${this.API_SERVER}/auth/serviceProvider/signup`,userobj)
}

postusersignup(userobj):Observable<null>{
  return this.hc.post<null>(`${this.API_SERVER}/auth/users/signup`,userobj)
}

 getadminlogin(userObj):Observable<{ accessToken: string }>{
return this.hc.post<{ accessToken: string }>(`${this.API_SERVER}/auth/signin`,userObj)
 }

 getuserlogin(userObj){
  return this.hc.post<any>(`${this.API_SERVER}/auth/signin`,userObj)
//   .pipe(map(user => {
//     // store user details and jwt token in local storage to keep user logged in between page refreshes
//     console.log(user)
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     localStorage.setItem('id_token', JSON.stringify(user.token));
//     // this.currentUserSubject.next(user);
//     return user;
// }));
   }


   
   getcart(username):Observable<any>{
     return this.hc.post("/cart/getitems",username)
   }

   postprofdata(profObj):Observable<any>{
     return this.hc.post("/professional/createprof",profObj)
   }

   postservices(servicesObj):Observable<any>{
     return this.hc.post("/services/createservices",servicesObj)
   }

   getservices():Observable<any>{
     return this.hc.get("services/getservices")
   }

   addtocart(cartObj):Observable<any>{
     return this.hc.post(`/cart/addtocart`,cartObj)
   }

   addquantitytocart(cartObj):Observable<any>{
     return this.hc.put("/cart/addquantitytocart",cartObj)
   }

   removequantitytocart(cartObj):Observable<any>{
    return this.hc.put("/cart/removequantitytocart",cartObj)
  }

   getservicetocart(username):Observable<any>{
return this.hc.get(`/cart/getservicesfrmcart/${username}`)
   }

   deletefrmcart(serviceObj):Observable<any>{
 return this.hc.put("/cart/deletefrmcart",serviceObj)
   }

   deleteservices(serviceObj):Observable<any>{
     return this.hc.put("/services/deleteservices",serviceObj)
   }

   getUserDetails(serviceId):Observable<any>{
    return this.hc.get(`/services/getservices/${serviceId}`)
      }
   updateservices(serviceObj):Observable<any>{
        return this.hc.put("/services/updateservice",serviceObj)
      }
      
   getmainservices(location):Observable<any>{
        return this.hc.get(`/services/getmainservices/${location}`)
          }

   deletecartfrmadmin(serviceObj):Observable<any>{
     return this.hc.put("/cart/cartdeletefrmadmin",serviceObj)
   }

   getprofessionaldetails():Observable<any>{
     return this.hc.get("/professional/getdetails")
   }
   
  
}