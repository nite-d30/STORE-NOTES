import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
 baseUrl='http://localhost:8000/api';
  constructor(private http: HttpClient) { }


  storeNotes(obj) {
    console.log(obj)
    return this.http.post(`${this.baseUrl}/storenotes`,obj)
  }


  getNotes(email) {
    return this.http.get(`${this.baseUrl}/getnotes?email=${email}`)
  }

  updateNotes(obj){
    return this.http.put(`${this.baseUrl}/updatenotes`,obj);
  }


}
