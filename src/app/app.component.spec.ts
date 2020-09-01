import { TestBed, async } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  OAuthService,
  UrlHelperService,
  OAuthLogger,
} from 'angular-oauth2-oidc';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { TaskService } from './task.service';
import { TaskLocalStorageService } from './task-local-storage.service';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes)],
      declarations: [AppComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        OAuthService,
        HttpClient,
        AuthenticationService,
        TaskService,
        TaskLocalStorageService,
        HttpHandler,
        UrlHelperService,
        OAuthLogger,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'task-manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('task-manager');
  });
});
