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

//users
 postadminsignup(userobj):Observable<any>{
  return this.hc.post(`${this.API_SERVER}/auth/admins/signup`,userobj)
}

postSPsignup(userobj):Observable<null>{
  return this.hc.post<null>(`${this.API_SERVER}/auth/serviceprovider/signup`,userobj)
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

//serviceProvider
getserviceproviders():Observable<any>{
  return this.hc.get(`${this.API_SERVER}/serviceproviders/getall`)
}


deleteprovider(providerObj):Observable<any>{
  return this.hc.delete(`${this.API_SERVER}/serviceproviders/${providerObj}`)
}




//services
  postservices(servicesObj):Observable<null>{
    return this.hc.post<null>(`${this.API_SERVER}/services/createservices`,servicesObj)
  }


  getservices():Observable<any>{
    return this.hc.get(`${this.API_SERVER}/services/getservices`)
  }


  deleteservices(serviceObj):Observable<any>{
    return this.hc.delete(`${this.API_SERVER}/services/deleteservices/${serviceObj}`)
  }

//cart
  addtocart(cartObj):Observable<any>{
    return this.hc.post(`${this.API_SERVER}/cart/addtocart`,cartObj)
  }


  getservicetocart():Observable<any>{
    return this.hc.get(`${this.API_SERVER}/cart/getitems`)
       }


   
  //  getcart(username):Observable<any>{
  //    return this.hc.post("/cart/getitems",username)
  //  }


   deletefrmcart(cartItemId):Observable<any>{
    return this.hc.delete(`${this.API_SERVER}/cart/${cartItemId}`)
      }
 
      //contact
      postcontactdata(contactObj):Observable<any>{
        return this.hc.post(`${this.API_SERVER}/contacts/new-mail`,contactObj)
      }
   

      postreview(reviewObj):Observable<any>{
        return this.hc.post(`${this.API_SERVER}/reviews/addreview`,reviewObj)
      }
      

   postprofdata(profObj):Observable<any>{
     return this.hc.post("/professional/createprof",profObj)
   }

   addquantitytocart(cartObj):Observable<any>{
     return this.hc.put("/cart/addquantitytocart",cartObj)
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
   
   ////////////oussema//////////////////////////////////

  //  createQuotedemand():Observable<any>{
  //    return this.hc.post(`${this.API_SERVER}/costestimation/create`,quoteDemandObj)
  //  }

   getAllDemands():Observable<any>{
     return this.hc.get(`${this.API_SERVER}/costestimation/all`)
   }

   getAllResponsesById(id):Observable<any>{
     return this.hc.get(`${this.API_SERVER}/spresponse/spresponses/${id}`)
   }

  //  createQuoteResponse(id):Observable<any>{
  //    return this.hc.post(`${this.API_SERVER}/spresponse/${id}`,quoteResponseObj)
  //  }

  addQuote(number):Observable<any>{
    return this.hc.put("/serviceprovider/quotenumber",number)
  }
  
}