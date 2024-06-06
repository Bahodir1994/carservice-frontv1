import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {PanelComponent} from "./router/panel/panel.component";
import {DashboardComponent} from "./router/dashboard/dashboard.component";
import {ClientComponent} from "./router/client/client.component";
import {StatisticsComponent} from "./router/statistics/statistics.component";
import {BacklogComponent} from "./router/backlog/backlog.component";

export const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full', runGuardsAndResolvers: 'always'},
      {path: 'dashboard', component: DashboardComponent, runGuardsAndResolvers: 'always'},
      {path: 'clients', component: ClientComponent, runGuardsAndResolvers: 'always'},
      {path: 'statistics', component: StatisticsComponent, runGuardsAndResolvers: 'always'},
      {path: 'backlog', component: BacklogComponent, runGuardsAndResolvers: 'always'},
    ]
  },
  {path: '**', redirectTo: 'dashboard'},
];
