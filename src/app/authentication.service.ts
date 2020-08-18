import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authCodeFlowConfig } from './auth.config';

import { map } from 'rxjs/operators';
import { TaskService } from './task.service';
import { Tokens } from './interfaces/tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private oauthService: OAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get userName(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get tokens(): Tokens {
    let tokens: Tokens;
    this.route.fragment
      .pipe(
        map((fragment) => new URLSearchParams(fragment)),
        map((params) => ({
          access_token: params.get('access_token'),
          id_token: params.get('id_token'),
          error: params.get('error'),
        }))
      )
      .subscribe((res) => (tokens = res));
    return tokens;
  }

  refresh() {
    this.oauthService.refreshToken();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  testValidAccessToken() {
    this.oauthService.tryLoginImplicitFlow().then(() => {
      this.router.navigate(['/lists']);
    });
  }

  configureOAuth() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(sessionStorage);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    let url = 'https://accounts.google.com/.well-known/openid-configuration';
    this.oauthService.loadDiscoveryDocument(url).then(() => {
      this.oauthService
        .tryLogin()
        .then(() => {})
        .catch((err) => console.log(err));
    });
  }
}
