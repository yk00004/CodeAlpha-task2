import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const Authservice=inject(AuthService);
  const router=inject(Router);
  if(Authservice.islogedin){
    return true;
  }else{
    router.navigateByUrl('auth/login');
    return false;
  }
};
