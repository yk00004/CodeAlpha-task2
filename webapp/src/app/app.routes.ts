import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './componenet/auth/login/login.component';
import { RegisterComponent } from './componenet/auth/register/register.component';
import { FeedPageComponent } from './componenet/feed/feed-page/feed-page.component';
import { CreatePostComponent } from './componenet/post/create-post/create-post.component';
import { ProfileComponent } from './componenet/user/profile/profile.component';
import { SuggestionsComponent } from './componenet/user/suggestions/suggestions.component';
import { SearchComponent } from './componenet/search/search.component';
import { NotificationComponent } from './componenet/notification/notification.component';
import { ChatComponent } from './componenet/chat/chat.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    // canActivate:[authGuard]
  },
  {
    path: '',
    component: FeedPageComponent,
    canActivate:[authGuard]
  },
  {
    path: 'createpost',
    component: CreatePostComponent,
    canActivate:[authGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate:[authGuard]
  },
  {
    path: 'suggestions',
    component: SuggestionsComponent,
    canActivate:[authGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate:[authGuard]
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate:[authGuard]
  },
  {
    path: 'chat/:otherUserId',
    component: ChatComponent,
    canActivate:[authGuard]
    },
  {
    path: '**',
    component: LoginComponent,
    },
];
