import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, NgIf, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userId: string = '';
  user: any;
  posts: any;
  profileImageFile!: any;

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

  this.userService.updateProfileImage(this.user._id, formData).subscribe((updatedUser: any) => {
    this.user.profileImage = updatedUser.profileImage;
    // this.profileImageFile = undefined;
    // this.previewUrl = null;
  });
}

}
