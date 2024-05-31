import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {DataResponse_dto_v1} from "./statistics-data-dto";

@Injectable({
  providedIn: 'root'
})
export class StatisticsDataService {

  constructor(private http: HttpClient, protected readonly keycloak: KeycloakService) {
  }

  getData(draw: number, param: string): Observable<DataResponse_dto_v1> {
    const accessToken = this.keycloak.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any>(`http://192.168.224.18:8761/messages?&draw=${draw}&searchparam=${param}`, { headers })
        .pipe(
            map(response => ({
              data: response
            }))
        );
  };
}
