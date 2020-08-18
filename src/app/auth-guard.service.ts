import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private oauthService: OAuthService) {}

  canActivate() {
    var hasIdToken = this.oauthService.hasValidIdToken();
    var hasAccessToken = this.oauthService.hasValidAccessToken();

    return hasIdToken && hasAccessToken;
  }
}
