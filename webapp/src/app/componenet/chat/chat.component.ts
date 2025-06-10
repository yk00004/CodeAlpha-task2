import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ChatService, Message } from '../services/chat.service';
// import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  constructor(
    private chat: ChatService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private rout:Router
  ) {
    this.chat.getHistory(this.otherUserId).subscribe((history: any) => {
      this.HistoryDATA = history;
    });
  }

  messages: any;
  inputText = '';
  currentUserId: any;
  otherUserId: any;
  HistoryDATA: any;
  private routeSub!: Subscription; // Subscription for route param changes
  private messageSub!: Subscription; // Subscription for real-time messages

  ngOnInit() {
    this.messages = signal<{ from: string; text: string; timestamp: number }[]>(
      []
    );
    this.inputText = '';
    this.currentUserId = this.auth.getCurrentUserId();
    this.otherUserId = this.route.snapshot.params['otherUserId'];

    this.chat.getHistory(this.otherUserId).subscribe((history: any) => {
      this.HistoryDATA = history;
    });

    // 3. Join real-time room
    this.chat.join(this.currentUserId);

    // 4. Subscribe to live messages
    this.chat.onMessage().subscribe((msg: any) => {
      // only add if it's for this chat pair
      if (
        msg.from === this.otherUserId ||
        (msg.from === this.currentUserId && msg.to === this.otherUserId)
      ) {
        this.messages.mutate((arr: any) => arr.push(msg));
      }
    });
  }

  send() {
    if (!this.inputText.trim()) return;

    // emit real-time
    this.chat.sendRealtime(
      this.currentUserId,
      this.otherUserId,
      this.inputText
    );

    // optimistically show our own message
    this.messages.mutate((arr: any) =>
      arr.push({
        from: this.currentUserId,
        text: this.inputText,
        timestamp: Date.now(),
      })
    );

    this.inputText = '';
    this.chat.getHistory(this.otherUserId).subscribe((history:any) => {
      this.HistoryDATA=history;

    });
  }
   private scrollToBottom(): void {
    // Using setTimeout(0) to defer execution until Angular has rendered the new messages
    setTimeout(() => {
      const chatContainer = document.querySelector('.flex-1.overflow-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
        console.log('Scrolled to bottom. ScrollHeight:', chatContainer.scrollHeight);
      } else {
        console.warn('Chat container not found for scrolling.');
      }
    }, 0); // <-- IMPORTANT: 0ms delay
  }

  ngOnDestroy(): void { // <-- Implement OnDestroy hook
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
    // Optionally, emit an event to the server that the user is leaving the chat component
    // this.chat.leaveConversation(this.otherUserId); // If you have such a method
  }

}
