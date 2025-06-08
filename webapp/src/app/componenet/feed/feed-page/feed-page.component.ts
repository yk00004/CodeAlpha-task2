import { Component } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-feed-page',
  imports: [NgIf,NgFor],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.scss'
})
export class FeedPageComponent {
   posts: any;
   constructor(private feedService: FeedService) {}

  ngOnInit(): any {
    this.feedService.getAllPosts().subscribe((e:any)=>{
      this.posts=e
    });
  }
  likePost(postId: string) {
    this.feedService.likePost(postId).subscribe({
      next: (updated:any) => {
        this.posts = this.posts.map((p:any) => p._id === updated._id ? updated : p);
      }
    });
  }

  }
