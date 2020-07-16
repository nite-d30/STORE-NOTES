import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
 baseUrl='http://localhost:8000/api';
  constructor(private http: HttpClient) { }


  storeNotes(obj) {
    return this.http.post(`${this.baseUrl}/storenotes`,obj)
  }


  getNotes(filterObj) {
    return this.http.post(`${this.baseUrl}/getnotes`,filterObj)
  }

  updateNotes(obj){
    return this.http.put(`${this.baseUrl}/updatenotes`,obj);
  }

  deletnotes(uuids){
    return this.http.post(`${this.baseUrl}/deletenotes`,uuids)
  }

}
