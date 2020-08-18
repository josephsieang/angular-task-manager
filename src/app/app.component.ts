import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-manager';

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.configureOAuth();
  }
}
