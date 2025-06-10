import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, CommonModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userId: string = '';
  user: any;
  posts: any;
  currentUserId: any;
  profileImageFile!: any;
  isOwnProfile: boolean = false;
  isFollowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private AuthService: AuthService
  ) {
  }

  ngOnInit() {
    this.currentUserId = this.AuthService.getCurrentUserId();
    this.isOwnProfile = this.currentUserId === this.userId;
    this.route.params.subscribe((e: any) => {
      this.userId = e.id;
      this.currentUserId = this.AuthService.getCurrentUserId();
      this.isOwnProfile = this.currentUserId === this.userId;
      this.loadProfile();
    });

    this.loadProfile();
  }
  followUser() {
    this.userService
      .followUser(this.currentUserId, this.userId)
      .subscribe(() => {
        this.isFollowing = true;
        this.user.followers.push(this.currentUserId);
      });
  }

  unfollowUser() {
    this.userService.unfollowUser(this.userId).subscribe(() => {
      this.isFollowing = false;
      this.user.followers = this.user.followers.filter(
        (id: string) => id !== this.currentUserId
      );
    });
  }
  loadProfile() {
    this.userService.getProfile(this.userId).subscribe((res: any) => {
      this.user = res;
      this.isFollowing = res.followers.includes(this.currentUserId);
    });

    this.userService.getUserPosts(this.userId).subscribe((res: any) => {
      this.posts = res;
    });
  }

  previewUrl: string | null = null;

  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    this.profileImageFile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfileImage() {
    if (!this.profileImageFile) return;

    const formData = new FormData();
    formData.append('profileImage', this.profileImageFile);

    this.userService
      .updateProfileImage(this.user._id, formData)
      .subscribe((updatedUser: any) => {
        this.user.profileImage = updatedUser.profileImage;
        // this.profileImageFile = undefined;
        // this.previewUrl = null;
      });
  }
}
