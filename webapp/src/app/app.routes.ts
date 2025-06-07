import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './componenet/auth/login/login.component';
import { RegisterComponent } from './componenet/auth/register/register.component';

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

];
