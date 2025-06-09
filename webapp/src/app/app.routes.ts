import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './componenet/auth/login/login.component';
import { RegisterComponent } from './componenet/auth/register/register.component';
import { FeedPageComponent } from './componenet/feed/feed-page/feed-page.component';
import { CreatePostComponent } from './componenet/post/create-post/create-post.component';
import { ProfileComponent } from './componenet/user/profile/profile.component';
import { SuggestionsComponent } from './componenet/user/suggestions/suggestions.component';

export const routes: Routes = [
  {
    path:"auth/login",
    component:LoginComponent
  },
  {
    path:"auth/register",
    component:RegisterComponent,
    // canActivate:[authGuard]
  },
  {
    path:"feed",
    component:FeedPageComponent,
    // canActivate:[authGuard]
  },
  {
    path:"createpost",
    component:CreatePostComponent ,
    // canActivate:[authGuard]
  },
  {
    path:"profile/:id",
    component:ProfileComponent ,
    // canActivate:[authGuard]
  },
  {
    path:"suggestions",
    component:SuggestionsComponent ,
    // canActivate:[authGuard]
  },

];
