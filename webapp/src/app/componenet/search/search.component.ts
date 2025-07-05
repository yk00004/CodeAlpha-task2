import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,RouterLink,FormsModule,MatIcon],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchText = '';
  users: any[] = [];
  defaulturl:any="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  

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
