import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-suggestions',
  imports: [MatCard,NgIf,NgFor],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent {
  suggestions: any[] = [];
  userId: string = '';

  constructor(private userService: UserService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userId = this.auth.getCurrentUserId()!;
    this.userService.getSuggestions(this.userId).subscribe((res: any) => {
      this.suggestions = res;
    });
  }

  follow(userToFollowId: string) {
    this.userService.followUser(this.userId, userToFollowId).subscribe(() => {
      this.suggestions = this.suggestions.filter(user => user._id !== userToFollowId);
    });
  }
}
