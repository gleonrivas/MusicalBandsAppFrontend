import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}
  private getHeaders() {
    const apiToken = localStorage.getItem("Authorization");
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

  public delete<K, T = Object>(url: string) {
    return this.http.delete<T>(url, {
      headers: this.getHeaders()
    });
  }

}
