import { Injectable } from '@angular/core';
import {SERVICES} from '../mock-services';
import {Service} from '../Service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:5000/services';
  API_SERVER = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]>{
    // const services = of(SERVICES);
    // return services;
    return this.http.get<Service[]>(this.apiUrl)
    // return this.http.get<Service[]>(`${this.API_SERVER}/services/getservices`)
  }
}
