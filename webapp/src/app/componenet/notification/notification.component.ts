import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../pipes/time.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [CommonModule,TimePipe,RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data;
    });
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.map(n =>
        n._id === id ? { ...n, read: true } : n
      );
    });
  }
}
