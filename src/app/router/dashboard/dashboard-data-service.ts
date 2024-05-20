import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {PaginatedDataResponse} from "./dashboard-data-dto";

@Injectable({
  providedIn: "root"
})
export class DashboardDataService {

  constructor(private http: HttpClient) {
  }

  getPaginatedData(page: number, size: number, param: string): Observable<PaginatedDataResponse> {
    console.log(param)
    return this.http.get<any>(`http://localhost:8761/list_cars?page=${page}&size=${size}&searchparam=${param}`)
      .pipe(
        map(response => ({
          data: response.content,
          totalElements: response.totalElements,
          pageable: response.pageable
        }))
      );
  }
}
