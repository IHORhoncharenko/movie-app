import { CanActivateFn } from '@angular/router';

export const searchGuard: CanActivateFn = (route, state) => {
  return true;
};
