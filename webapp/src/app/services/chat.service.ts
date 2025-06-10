import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  from: string;
  to: string;
  text: string;
  createdAt: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
 private socket: Socket;
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5000/api/chat';

  constructor() {
    this.socket = io('http://localhost:5000', { transports: ['websocket'] });
  }

  join(userId: string) {
    this.socket.emit('user-joined', userId);
  }

  // Real-time send
  sendRealtime(from: string, to: string, text: string) {
    this.socket.emit('send-message', { from, to, text });
  }

  // Real-time receive
  onMessage(): Observable<{ from: string; text: string; timestamp: number }> {
    return new Observable(observer => {
      this.socket.on('receive-message', (data:any) => observer.next(data));
      return () => this.socket.off('receive-message');
    });
  }

  // REST: fetch past messages
  getHistory(otherUserId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/history/${otherUserId}`);
  }
}
