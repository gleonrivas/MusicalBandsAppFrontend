import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = sessionStorage.getItem('Authorization');

    if (!isAuthenticated) {
      this.router.navigate(['/pleaseLoggin']);
      return false;
    }

    return true;
  }
}
