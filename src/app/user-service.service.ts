import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { SubmitReq } from './submit-req';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = "http://localhost:4000"
  constructor(private httpClient: HttpClient) { }

  createCustomer(customer: Customer): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + "/users", customer);
  }

  sendForm(form: SubmitReq): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + "/submit-feedback", form);
  }

  loginUser(form: FormGroup): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + "/login-user", form);
  }

  getUserById(id: any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + "/getUserById/" + id);
  }

}
