import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService , public router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe((response : any) => {
        if (response && response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/transaction-list']);
        }
      }, (error: any) => {
        console.error('Login failed:', error);
      });
  }
}
