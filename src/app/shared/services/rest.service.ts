import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}
  private getHeaders() {
    const apiToken = sessionStorage.getItem("Authorization");
    const headers = new HttpHeaders();
    return headers.set("Authorization", apiToken!);
  }

  public get<T = Object>(url: string) {
    return this.http.get<T>(url, {
      headers: this.getHeaders()
    });
  }

  public post<K, T = Object>(url: string, body: K) {
    return this.http.post<T>(url, body, {
      headers: this.getHeaders()
    });
  }

  public delete<T = Object>(url: string) {
    return this.http.delete<T>(url, {
      headers: this.getHeaders()
    });
  }

  public deleteBody<K, T = Object>(url: string,  body:K) {
    return this.http.delete<T>(url, {
      headers: this.getHeaders(),
      body
    });
  }

  public put<K,T =Object>(url:string, body:K){
    return this.http.put<T>(url, body, {
      headers: this.getHeaders()
    })
  }

}
