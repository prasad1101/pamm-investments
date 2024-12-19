import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get("https://jsonblob.com/api/jsonBlob/1319247450992730112")
  }

  updateData(payload: any): Observable<any> {
    return this.httpClient.put("https://jsonblob.com/api/jsonBlob/1319247450992730112", payload)
  }
}
