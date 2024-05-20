import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {dashboard_data_dto_v1, pageable_data_dto_v1, PaginatedDataResponse} from "./dashboard-data-dto";
import {DashboardDataService} from "./dashboard-data-service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatGridListModule} from "@angular/material/grid-list";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatPaginatorModule,
        MatIconModule,
        MatChipsModule,
        MatGridListModule,
        MatFormFieldModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, MatProgressBar
    ],
})
export class DashboardComponent {
  data: dashboard_data_dto_v1[] = [];
  recordsTotal = 0;
  pageable: pageable_data_dto_v1[] = []

  constructor(private dataService: DashboardDataService) {}

  ngOnInit(): void {
    this.loadData(0, 8, ''); // загрузка первой страницы с размером страницы 10
  }

  applyFilter(event: any) {
    const value = (event.target as HTMLInputElement).value; // Получаем значение поля ввода
    this.loadData(0, 8, value.trim().toLowerCase());
  }

  loadData(page: number, size: number, param: string) {
    this.dataService.getPaginatedData(page, size, param)
        .subscribe((response: PaginatedDataResponse) => {
          this.data = response.data;
          this.recordsTotal = response.totalElements;
          this.pageable = response.pageable;
        });
  }

  onPageChange(event: any, searchParam: string) {
    const newPage = event.pageIndex; // Новый индекс страницы
    const newSize = event.pageSize; // Новый размер страницы
    this.loadData(newPage, newSize, searchParam); // Загрузка данных для новой страницы и размера страницы
  }
}
