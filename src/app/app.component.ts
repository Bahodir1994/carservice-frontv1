import { APP_INITIALIZER, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { HttpClientModule } from '@angular/common/http';
import {HeaderComponent} from "./theme/header/header.component";
import {RefreshTokenComponent} from "./init/refresh-token/refresh-token.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      RouterOutlet,
      KeycloakAngularModule,
      RefreshTokenComponent,
      HttpClientModule,
      HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dny-netflix';
}
