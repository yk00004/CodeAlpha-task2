import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getProfile(userId: string) {
    return this.http.get(`${this.API_URL}/user/${userId}`);
  }
  getUserPosts(userId: string) {
    return this.http.get(`${this.API_URL}/posts/user/${userId}`);
  }
  getSuggestions(userId: string) {
    return this.http.get(`${this.API_URL}/user/suggestions/${userId}`);
  }
  followUser(myId: string, targetId: string) {
    return this.http.put(`${this.API_URL}/user/follow`, {
      userId: myId,
      followId: targetId,
    });
  }
  unfollowUser(followId: string) {
    return this.http.put(`${this.API_URL}/user/unfollow/${followId}`, {});
  }
  updateProfileImage(userId: string, formData: FormData) {
    return this.http.put(
      `${this.API_URL}/user/${userId}/profile-image`,
      formData
    );
  }
  searchUsers(query: string) {
    return this.http.get(`${this.API_URL}/user/search?query=${query}`);

  }
}
