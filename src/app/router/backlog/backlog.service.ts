import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {KeycloakService} from 'keycloak-angular';
import {PaginatedDataResponsePayment} from "./backlog-data-dto";


@Injectable({
    providedIn: 'root'
})
export class BacklogService {
    private baseUrl = 'http://localhost:8761/payment'; // URL вашего контроллера

    constructor(private http: HttpClient, protected readonly keycloak: KeycloakService) {
    }


    getPaginatedData(page: number, size: number, draw: number, param: string): Observable<PaginatedDataResponsePayment> {
        const accessToken = this.keycloak.getToken();

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });

        return this.http.get<PaginatedDataResponsePayment>(`${this.baseUrl}?page=${page}&size=${size}&draw=${draw}&searchparam=${param}`, {headers});
    }
}
