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

      //Pagination : Start
    /**
     * Method which returns page and total no of pages
     * @param index - current page number
     * @param totalCount -total rows in table
     * @param pageSize - Total Page size
     */
    pagination(index, totalCount, pageSize) {
      let pager = [];
      let totalPages = Math.ceil(totalCount / pageSize);
      let i = 0;
      let finalSize = 0;

      if (index * 10 < totalPages) {
          finalSize = index * 10;
      } else {
          finalSize = totalPages;
      }
      i = (index - 1) * 10;
      while (i < finalSize) {
          pager.push(i + 1);
          i = i + 1;
      }
      return { pager: pager, page_Index: totalPages };
  }
}
