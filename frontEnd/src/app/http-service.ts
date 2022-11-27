import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class apiHttpService {
  constructor(private http: HttpClient) {}

  public getUserDetail(url: string) {
    return this.http.get(url);
  }

  public getUsers(url: string) {
    return this.http.get(url);
  }

  public addUser(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  public updateUser(url: string, data: any, options?: any) {
    return this.http.put(url, data, options);
  }

  public deleteUser(url: string, options?: any) {
    return this.http.delete(url, options);
  }

  public uploadImage(url: string, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(url, formData);
  }
}
