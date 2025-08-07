import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  if (
    localStorage.getItem('userToken') !== null &&
    localStorage.getItem('role') === 'SuperAdmin'
  ) {
    return true;
  } else {
    _router.navigate(['/dashboard']);
    Swal.fire({
      icon: 'warning',
      title: 'Admin Only',
      text: 'Admins only can access this page.',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      backdrop: true,
    });

    return false;
  }
};
