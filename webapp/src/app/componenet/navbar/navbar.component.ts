import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   constructor(public authService: AuthService, private router: Router) {}

  goToMyProfile() {
    const userId = this.authService.getCurrentUserId();
    console.log(userId);

    if (userId) {
      this.router.navigate(['/profile', userId]);
    }
  }
}
