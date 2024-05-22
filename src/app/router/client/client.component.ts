import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {
    client_cars_data_dto_v1,
    pageable_data_dto_v1,
    PaginatedDataResponse,
    products_data_dto_v1
} from "./client-data-dto";
import {ClientDataService} from "./client-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {OverlayModule} from "@angular/cdk/overlay";
import {CdkMenuModule} from "@angular/cdk/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatDividerModule} from "@angular/material/divider";
import {CommonModule} from "@angular/common";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {KeycloakService} from 'keycloak-angular';
import {MatTabsModule} from "@angular/material/tabs";

@Component({
    selector: 'app-client',
    standalone: true,
    templateUrl: './client.component.html',
    styleUrl: './client.component.css',
    imports: [
        MatAccordion,
        MatExpansionModule,
        MatDatepickerModule,
        CommonModule,
        OverlayModule,
        CdkMenuModule,
        HttpClientModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBar,
        MatChipsModule,
        MatIcon, MatTabsModule,
        MatInputModule, MatIconModule, MatRadioModule, MatTableModule, MatListModule, MatDividerModule,
        ReactiveFormsModule, MatFormFieldModule, MatSelectModule, FormsModule, MatGridList, MatGridTile
    ]
})
export class ClientComponent implements AfterViewInit {
    client_fullName = '';
    data: products_data_dto_v1[] = [];
    recordsTotal = 0;
    pageable: pageable_data_dto_v1[] = []
    responseData: client_cars_data_dto_v1[] = [];

    constructor(
        private dataService: ClientDataService,
        private fb: FormBuilder,
        private http: HttpClient,
        private _snackBar: MatSnackBar,
        protected readonly keycloak: KeycloakService
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
        this.loadData(0, 10, ''); // загрузка первой страницы с размером страницы 10
    }

    applyFilter(event: any) {
        const value = (event.target as HTMLInputElement).value; // Получаем значение поля ввода
        this.loadData(0, 10, value.trim().toLowerCase());
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
        const newPage = event.pageIndex;
        const newSize = event.pageSize;
        this.loadData(newPage, newSize, searchParam);
    }

    onSubmit() {
        if (this.carForm.valid) {
            const accessToken = localStorage.getItem('accessToken');

            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            });

            this.http.post('http://localhost:8761/products', this.carForm.value, {headers})
                .subscribe(response => {
                    this.ngOnInit()
                }, error => {
                    console.error('Error:', error);
                });
        }
    };

    onItemClick(itemId: string, fullName: string) {
        this.client_fullName = fullName
        const accessToken = localStorage.getItem('accessToken');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });

        const url = `http://localhost:8761/products/${itemId}`;

        this.http.get<client_cars_data_dto_v1[]>(url, {headers}).subscribe(
            (response: client_cars_data_dto_v1[]) => {
                this.responseData = response;
            },
            error => {
                console.error('Error:', error);
            }
        );
    };

    carForm: FormGroup;
    carTypeGroups = [
        {
            name: 'CHEVROLET',
            pokemon: [
                {value: '001', viewValue: 'Cobalt'},
                {value: '002', viewValue: 'Matiz'},
                {value: '003', viewValue: 'Tracker'},
            ],
        }
    ];

    ngAfterViewInit(): void {
        this.loadData(0, 10, '');
    }
}
