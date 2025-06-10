import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ChatService, Message } from '../services/chat.service';
// import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  constructor(
    private chat: ChatService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {

  }

  messages:any;
  inputText = '';
 currentUserId:any;
 otherUserId :any;

  ngOnInit() {
    this.messages = signal<{ from: string; text: string; timestamp: number }[]>([]);
   this.inputText = '';
   this.currentUserId = this.auth.getCurrentUserId()
   this.otherUserId = '';
    // 1. Grab the otherUserId from route, e.g. /chat/:otherUserId
    this.otherUserId = this.route.snapshot.params['otherUserId'];

    // 2. Load history via REST
    this.chat.getHistory(this.otherUserId).subscribe((history:any) => {
      history.forEach((m:any) => {
        this.messages.mutate((arr:any) =>
          arr.push({ from: m.from.toString(), text: m.text, timestamp: new Date(m.createdAt).getTime() })
        );
      });
    });

    // 3. Join real-time room
    this.chat.join(this.currentUserId);

    // 4. Subscribe to live messages
    this.chat.onMessage().subscribe((msg:any) => {
      // only add if it's for this chat pair
      if (
        (msg.from === this.otherUserId && this.currentUserId) ||
        (msg.from === this.currentUserId && msg.from !== this.otherUserId)
      ) {
        this.messages.mutate((arr:any) => arr.push(msg));
      }
    });
  }

  send() {
    if (!this.inputText.trim()) return;

    // emit real-time
    this.chat.sendRealtime(this.currentUserId, this.otherUserId, this.inputText);

    // optimistically show our own message
    this.messages.mutate((arr:any) =>
      arr.push({ from: this.currentUserId, text: this.inputText, timestamp: Date.now() })
    );

    this.inputText = '';
  }
}
