import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchText = '';
  users: any[] = [];

  constructor(private userService: UserService) {}

  onSearch() {
    if (this.searchText.trim() === '') {
      this.users = [];
      return;
    }

    this.userService.searchUsers(this.searchText).subscribe((res: any) => {
      this.users = res;
    });
  }
}
