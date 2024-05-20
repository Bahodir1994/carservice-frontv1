import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {PanelComponent} from "./router/panel/panel.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {DashboardComponent} from "./router/dashboard/dashboard.component";
import {ClientComponent} from "./router/client/client.component";
import {StatisticsComponent} from "./router/statistics/statistics.component";

export const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomepageComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clients', component: ClientComponent },
      { path: 'statistics', component: StatisticsComponent },
    ]
  },
  { path: '**', redirectTo: 'home' },
];
