import { Component, Input } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../../pipes/time.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-card',
  imports: [MatCard,MatIconModule,CommonModule,TimePipe,FormsModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
   @Input() post: any;
  currentUserId: string = '';
  commentText = '';
  constructor(private postService: PostService, private auth: AuthService) {
    this.currentUserId = this.auth.getCurrentUserId()!;
  }

  hasLiked(): boolean {
    return this.post.likes.includes(this.currentUserId);
  }

  toggleLike() {
    this.postService.likePost(this.post._id, this.currentUserId).subscribe((res: any) => {
      this.post.likes = res.likes;
    });
  }
  addComment() {
  if (!this.commentText.trim()) return;

  this.postService.addComment(this.post._id, this.currentUserId, this.commentText)
    .subscribe((updatedPost: any) => {
      this.post.comments = updatedPost.comments;
      this.commentText = '';
    });
}
}
