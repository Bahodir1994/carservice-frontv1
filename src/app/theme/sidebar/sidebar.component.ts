import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule
  ]
})
export class SidebarComponent {
  showFiller = false;
}
