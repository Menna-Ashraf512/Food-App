import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const userGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  if (
    localStorage.getItem('userToken') !== null &&
    localStorage.getItem('role') === 'SystemUser'
  ) {
    return true;
  } else {
    _router.navigate(['/dashboard']);
    Swal.fire({
      icon: 'warning',
      title: 'Access Denied',
      text: 'System users only.',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      backdrop: true,
    });

    return false;
  }
};
