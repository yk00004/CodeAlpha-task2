import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule ,NgIf,NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
   userId: string = '';
  user: any;
  posts: any;
   constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProfile();
  }

  loadProfile() {
    this.userService.getProfile(this.userId).subscribe((res: any) => {
      this.user = res;
    });

    this.userService.getUserPosts(this.userId).subscribe((res: any) => {
      this.posts = res;
      // console.log(this.posts);

    });
  }

}
