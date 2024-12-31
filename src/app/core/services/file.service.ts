
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  upload(file:any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUrl+'api/file/upload', formData)
}

}
