import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getProfile(userId: string) {
    return this.http.get(`${this.API_URL}/user/${userId}`);
  }
  getUserPosts(userId: string) {
    console.log(userId);

    return this.http.get(`${this.API_URL}/posts/user/${userId}`);
  }

}
