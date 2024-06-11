import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {BacklogService} from "./backlog.service";
import {CarParamsDataDtoV1, PaginatedDataResponsePayment} from "./backlog-data-dto";

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
})
export class BacklogComponent implements AfterViewInit{
  dataSource = new MatTableDataSource<CarParamsDataDtoV1>();
  displayedColumns: string[] = ['fullName', 'insTime', 'phone', 'serviceCharge', 'moneyNeed'];
  recordsTotal = 0;
  draw = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: BacklogService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadPaymentData(0, 10, this.draw, '');
  }

  loadPaymentData(page: number, size: number, draw: number, param: string) {
    this.dataService.getPaginatedData(page, size, draw, param)
        .subscribe((response: PaginatedDataResponsePayment) => {
          console.log('Data from server:', response.content); // Выводим данные в консоль
          if (response && response.content) {
            this.dataSource.data = response.content.map(car => {
              const totalMoneyNeed = car.payments.reduce((sum, payment) => sum + payment.moneyNeed, 0);
              return { ...car, totalMoneyNeed };
            });
            this.recordsTotal = response.totalElements;
            this.paginator.length = this.recordsTotal; // Устанавливаем общее количество записей для пагинатора
          } else {
            console.error('Invalid response from server:', response);
          }
        }, error => {
          console.error('Error fetching data from server:', error);
        });
  }

  onPageChange(event: PageEvent) {
    const newPage = event.pageIndex; // Новый индекс страницы
    const newSize = event.pageSize; // Новый размер страницы
    this.draw++;
    this.loadPaymentData(newPage, newSize, this.draw, '');
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value; // Получаем значение поля ввода
    this.draw++;
    this.loadPaymentData(0, 10, this.draw, value.trim().toLowerCase());
  }
}
