import { Component } from '@angular/core';
import {KeycloakEventType, KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-refresh-token',
  standalone: true,
  imports: [],
  templateUrl: './refresh-token.component.html',
  styleUrl: './refresh-token.component.css'
})
export class RefreshTokenComponent {
  constructor(private keycloakService: KeycloakService) { }

  ngOnInit() {
    this.keycloakService.keycloakEvents$.subscribe({
      next: (event) => {
        if (event.type === KeycloakEventType.OnTokenExpired) {
          this.keycloakService.updateToken(20); // Update token with 20 seconds buffer
        }
      }
    });
  }
}
