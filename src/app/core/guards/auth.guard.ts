import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  if (localStorage.getItem('userToken') !== null) {
    return true;
  } else {
    _router.navigate(['/auth']);
    Swal.fire({
      icon: 'error',
      title: 'Login Required',
      text: 'You must be logged in to access this page. Please log in to continue.',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      backdrop: true,
    });

    return false;
  }
};
