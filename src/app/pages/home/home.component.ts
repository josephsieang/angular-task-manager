import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  googleIcon = faGoogle;
  constructor(private authenticationService: AuthenticationService) {}

  login(): void {
    this.authenticationService.login();
  }
}
