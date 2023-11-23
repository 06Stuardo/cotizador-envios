import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerModel } from '../model/customer-model';
import { map } from 'rxjs/operators';
import { RateModel } from '../model/rate-model';
import { Options } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class QuoterService {

  URL_API_QTN: string = environment.API_QTN;
  URL_API_CUSTOMER: string = environment.API_CUSTOMER;
  URL_API_RATE: string =  environment.API_RATE;
  HEADERS: any = {"Content-Type":"application/json"}
  

  constructor(private httpClient: HttpClient) {

  }

  getCustomer(id:number): Observable<CustomerModel[]> {
    return this.httpClient.get<CustomerModel[]>(this.URL_API_CUSTOMER + '/list/' + id).pipe(map(res => res));
  }

  insertCustomer(body: any): Observable<any> {

    

    return this.httpClient.post<any>(this.URL_API_CUSTOMER + '/insert', body, {headers:this.HEADERS} ).pipe(map(resp => resp));
  }

  getRates(): Observable<RateModel[]> {
    return this.httpClient.get<RateModel[]>(this.URL_API_RATE + '/listRates').pipe(map(res => res));
  }

  getGrandTotal(body: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API_QTN + '/grandTotalQTN', body, {headers:this.HEADERS} ).pipe(map(resp => resp));
  }



}
