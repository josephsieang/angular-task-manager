import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';

import { map } from 'rxjs/operators';
import { Tokens } from './interfaces/tokens';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private oauthService: OAuthService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get userName(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims[`given_name`];
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

  refresh(): void {
    this.oauthService.refreshToken();
  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  logout(): void {
    this.oauthService.logOut();
    this.router.navigate(['/home']);
  }

  saveTokensToSessionStorage(): void {
    this.oauthService.tryLoginImplicitFlow().then(() => {
      const list = this.taskService.getLists();
      if (list.length > 0) this.router.navigate(['/lists', list[0].title]);
      else this.router.navigate(['/lists']);
    });
  }

  configureOAuth(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(sessionStorage);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    const url = 'https://accounts.google.com/.well-known/openid-configuration';
    this.oauthService.loadDiscoveryDocument(url).then(() => {
      this.oauthService
        .tryLogin()
        .then(() => {})
        .catch((err) => console.log(err));
    });
  }
}
