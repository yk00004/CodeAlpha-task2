import { NotificationService } from './../../../services/notification.service';
import { NotificationComponent } from './../../notification/notification.component';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { NgFor, NgIf } from '@angular/common';
import { PostCardComponent } from '../../post/post-card/post-card.component';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed-page',
  imports: [NgFor, NgIf,RouterLink, PostCardComponent],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.scss',
})
export class FeedPageComponent {
  posts: any;
  defaulturl:any="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  
  constructor(
    private feedService: FeedService,
    private user: UserService,
    private AuthService: AuthService
  ) {}
  curruser: any;
  suggetionlist: any;
  ngOnInit(): any {
    this.curruser = this.AuthService.getCurrentUserId();
    this.feedService.getAllPosts().subscribe((e: any) => {
      this.posts = e;
    });
    this.user.getSuggestions(this.curruser).subscribe((e) => {
      this.suggetionlist = e;
    });
  }
  likePost(postId: string) {
    this.feedService.likePost(postId).subscribe({
      next: (updated: any) => {
        this.posts = this.posts.map((p: any) =>
          p._id === updated._id ? updated : p
        );
      },
    });
  }
}
