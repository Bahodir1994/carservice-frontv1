import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {PaginatedDataResponse} from "./dashboard-data-dto";
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: "root"
})
export class DashboardDataService {

  constructor(
      private http: HttpClient,
      protected readonly keycloak: KeycloakService
  ) {
  }

  getPaginatedData(page: number, size: number, param: string): Observable<PaginatedDataResponse> {
      const accessToken = this.keycloak.getToken();

      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      });

      return this.http.get<any>(`http://192.168.224.18:8761/dashboard?page=${page}&size=${size}&searchparam=${param}`, { headers })
      .pipe(
        map(response => ({
          data: response.content,
          totalElements: response.totalElements,
          pageable: response.pageable
        }))
      );
  }
}
