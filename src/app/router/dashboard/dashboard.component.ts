import {AfterViewInit, Component, OnInit} from '@angular/core';
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
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {MatProgressBar} from "@angular/material/progress-bar";
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DashboardDialogV1Component} from "../dialogos/dashboard-dialog-v1/dashboard-dialog-v1.component";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        CommonModule, MatCardModule,
        MatDividerModule, MatButtonModule, MatPaginatorModule,
        MatIconModule, MatChipsModule, MatGridListModule,
        MatFormFieldModule, MatFormFieldModule, MatInputModule,
        FormsModule, MatButtonModule, MatIconModule, MatProgressBar,
        MatDialogModule, MatButtonModule
    ],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    data: dashboard_data_dto_v1[] = [];
    recordsTotal = 0;
    pageable: pageable_data_dto_v1[] = []
    carForm: FormGroup;

    constructor(
        private dataService: DashboardDataService,
        private router: Router,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) {
        this.carForm = this.fb.group({
            fio: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            carType: ['', Validators.required],
            carNumber: ['', Validators.required],
            carColor: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.router.events.subscribe((val) => {//Use Router class to subscribe to events
            this.loadData(0, 8, ''); // загрузка первой страницы с размером страницы 10
        })
    }

    openDialog(item: any) {
        const dialogRef = this.dialog.open(DashboardDialogV1Component, {
            data: {
                selectedItem: item,
                loadData: this.loadData.bind(this)
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadData(0, 8, '');
            }
            console.log(`Dialog result: ${result}`);
        });
    }

    applyFilter(event: any) {
        const value = (event.target as HTMLInputElement).value; // Получаем значение поля ввода
        this.loadData(0, 8, value.trim().toLowerCase());
    }

    public loadData(page: number, size: number, param: string) {
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

    ngAfterViewInit(): void {
        this.loadData(0, 8, ''); // загрузка первой страницы с размером страницы 10
    }
}
