import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

private API = 'http://localhost:5000/notification';

  constructor(private http: HttpClient) {}

  getNotifications() {
    return this.http.get<any[]>(this.API);
  }

  markAsRead(id: string) {
    return this.http.put(`${this.API}/${id}/read`, {});
  }
  postnotification(sender:string,receiver:string, type:string, post:String|undefined) {
    return this.http.post(`${this.API}`, {sender,receiver, type, post});
  }
}
