import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCardModule} from "@angular/material/card";
import {MatSliderModule} from "@angular/material/slider";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
  imports: [
      CommonModule,
      RouterOutlet,
      RouterLink,
      MatInputModule,
      MatSelectModule,
      MatAutocompleteModule,
      MatToolbarModule,
      MatMenuModule,
      MatIconModule,
      MatButtonModule,
      MatBadgeModule,
      MatSidenavModule,
      MatListModule,
      MatCardModule,
      MatSliderModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      MatCheckboxModule,
      MatDialogModule

  ],
})
export class PanelComponent {
    badge_visible = false;
    badge_visibility() {this.badge_visible = true;}

    constructor(private router: Router) {}

    isActive(url: string): boolean {
        console.log(this.router.url)
        return this.router.url === url;
    }
}
