import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
   private API_URL = 'http://localhost:5000/posts';

  constructor(private http: HttpClient) {}

  getAllPosts():any {
    return this.http.get<any[]>(this.API_URL);
  }
   createPost(formData: FormData) {
    return this.http.post(this.API_URL, formData);
  }
  likePost(id: string): any {
    return this.http.put(`${this.API_URL}/like/${id}`, {});
  }

  commentOnPost(id: string, text: string): any {
    return this.http.post(`${this.API_URL}/comment/${id}`, { text });
  }

}
