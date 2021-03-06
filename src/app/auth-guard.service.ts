import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(): boolean {
    const hasIdToken = this.oauthService.hasValidIdToken();
    const hasAccessToken = this.oauthService.hasValidAccessToken();

    if (!hasIdToken && !hasAccessToken) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
