import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl='http://localhost:8000/api';
  constructor(private http:HttpClient) { }


  uploadFile(fileData : File,filetype){
    return this.http.post(`${this.baseUrl}/fileUpload`, fileData, {
      headers: new HttpHeaders({
          'fileextension': filetype,
          'content-type': 'multipart/form-data'
      })
  });
  }
}
