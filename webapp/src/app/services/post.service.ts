import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private API_URL = 'https://social-bf8b.onrender.com/posts';
  constructor(private http: HttpClient) {}
  likePost(postId: string, userId: string) {
    return this.http.put(`${this.API_URL}/like/${postId}`, { userId });
  }
  addComment(postId: string, userId: string, text: string) {

    return this.http.post(`${this.API_URL}/comment/${postId}`, {
      userId,
      text,
    });
  }
}
