import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
   constructor(public authService: AuthService, private router: Router) {}

  // goToMyProfile() {
  //   const userId = this.authService.getCurrentUserId();
  //   console.log(userId);

  //   if (userId) {
  //     this.router.navigate(['/profile', userId]);
  //   }
  // }
  user:any
  ngOnInit(): void {

    this.user = this.authService.getCurrentUserId()
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
