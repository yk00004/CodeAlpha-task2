import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);
// };
// import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Or use a service if preferred
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next(authReq);
  }

  return next(req);
};
