import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  inputText = '';
  currentUserId: any;
  otherUserId: any;
  HistoryDATA: any[] = [];
  otherprofiledata:any;
  private messageSub!: Subscription;

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(
    private chat: ChatService,
    private auth: AuthService,
    private user: UserService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.inputText = '';
    this.currentUserId = this.auth.getCurrentUserId();
    this.otherUserId = this.route.snapshot.params['otherUserId'];

    this.user.getProfile(this.otherUserId).subscribe((e)=>{
      this.otherprofiledata=e
    })

    this.loadHistory();
    this.chat.join(this.currentUserId);

    this.messageSub = this.chat.onMessage().subscribe((msg: any) => {
      if (
        msg.from === this.otherUserId ||
        (msg.from === this.currentUserId && msg.to === this.otherUserId)
      ){
        this.HistoryDATA.push(msg);
        this.scrollToBottom();
      }
    });
  }

  ngAfterViewInit(): void {
    // When DOM is ready, scroll to bottom
    this.scrollToBottom(true);
  }

  loadHistory() {
    this.chat.getHistory(this.otherUserId).subscribe((history: any[]) => {
      this.HistoryDATA = history || [];
      this.cdr.detectChanges(); // ensure DOM updates
      this.scrollToBottom(true);
    });
  }

  send() {
    if (!this.inputText.trim()) return;

    this.chat.sendRealtime(this.currentUserId, this.otherUserId, this.inputText);

    const newMessage = {
      from: this.currentUserId,
      text: this.inputText,
      timestamp: Date.now(),
    };

    this.HistoryDATA.push(newMessage);
    this.inputText = '';
    this.cdr.detectChanges();
    this.scrollToBottom(true);
  }

  scrollToBottom(force: boolean = false): void {
    if (!this.chatContainer) return;

    setTimeout(() => {
      const el = this.chatContainer.nativeElement;
      const isNearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 150;

      if (force || isNearBottom) {
        el.scrollTop = el.scrollHeight;
      }
    }, 100); // wait for DOM to paint
  }

  ngOnDestroy(): void {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
  }
}
